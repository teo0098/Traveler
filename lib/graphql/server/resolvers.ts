import validator from "validator";
import {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
} from "apollo-server-micro";
import { withFilter } from "apollo-server";

import { AddTravelArgs, UserType } from "../../types/types";
import {
  ChangePasswordErrors,
  GlobalErrors,
  LoginErrors,
  VerifyErrors,
} from "./errors";
import bcrypt from "bcrypt";
import { query, db } from "../../db/db";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { SubscriptionsTypes } from "./subscriptionsTypes";
import { Context } from "../../interfaces/Context";
import { VerifyToken } from "../../interfaces/VerifyToken";
import { cloudinary } from "../../cloudinary/cloudinary";

const resolvers = {
  Query: {
    users: async (_: unknown, args: { userName: string }) => {
      try {
        if (!/^[A-Za-z0-9ęóąśłżźćńĘÓĄŚŁŻŹĆŃ]{2,30}$/.test(args.userName))
          throw new UserInputError("Brak wyników");

        const users = await query(
          `SELECT id, username FROM users WHERE verified=1 AND username LIKE '${args.userName}%' LIMIT 20`
        );

        return users;
      } catch (e) {
        throw new Error(e.message ? e.message : GlobalErrors.STH_WENT_WRONG);
      }
    },
    travels: async (_: unknown, args: { offset: number }) => {
      try {
        const travels = await query(
          `
            SELECT travels.id, travels.name, travels.created_at , travel_images.image_url, users.username
            FROM travels
            JOIN users ON travels.user_id=users.id
            JOIN travel_images ON travels.id=travel_images.travel_id
            WHERE travels.private=0
            GROUP BY travels.id
            ORDER BY travels.created_at DESC
            LIMIT 1 OFFSET ?`,
          [args.offset]
        );

        if (travels.length === 0) return null;
        return travels;
      } catch (e) {
        throw new Error(e.message ? e.message : GlobalErrors.STH_WENT_WRONG);
      }
    },
    travel: async (_: unknown, args: { id: number }) => {
      try {
        const results = await db
          .transaction()
          .query(
            `
            SELECT travels.description, travels.payAttention, travels.startTime, travels.endTime
            FROM travels WHERE travels.id = ?`,
            [args.id]
          )
          .query(
            `
            SELECT travel_images.image_url, travel_images.image_desc
            FROM travel_images WHERE travel_images.travel_id = ?`,
            [args.id]
          )
          .query(
            `
            SELECT users.username, users.id
            FROM users, travel_tags 
            WHERE travel_tags.user_id = users.id 
            AND travel_tags.travel_id = ?`,
            [args.id]
          )
          .commit();

        if (!results || results.length < 1) throw new Error();

        return {
          ...results[0][0],
          images: results[1],
          users: results[2],
        };
      } catch (e) {
        throw new Error(e.message ? e.message : GlobalErrors.STH_WENT_WRONG);
      }
    },
  },
  Mutation: {
    registerUser: async (
      _: unknown,
      args: {
        password: string;
        username: string;
        email: string;
      }
    ) => {
      try {
        const SECRET: string = process.env.SECRET!;
        const token = jwt.sign({ username: args.username }, SECRET);
        let passwordRegex = new RegExp(
          "(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$"
        );
        let hashedPassword = "";

        if (passwordRegex.test(args.password))
          hashedPassword = await bcrypt.hash(args.password, 10);
        else
          throw new Error(
            "Password must contains at least: 8 characters, 1 uppercase & lowercase & number and special character"
          );

        await query("SELECT username FROM users WHERE username = ?", [
          args.username,
        ]).then((res) => {
          if (res.length > 0) {
            throw new Error("User exists!");
          }
        });
        await query(
          "INSERT INTO users (username, password, email) VALUES (?,?,?)",
          [args.username, hashedPassword, args.email]
        ).then(async (res) => {
          const verifyHash = crypto.randomBytes(128).toString("hex");
          const userID = res.insertId;

          await query(
            "INSERT INTO users_verified (user_id, hash) VALUES (?,?)",
            [userID, verifyHash]
          );

          let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 25,
            secure: false,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASSWORD,
            },
          });
          await transporter
            .sendMail({
              from: "administracja@email.com",
              to: args.email,
              subject: "Cześć! " + args.username + " potwierdź swój email",
              text:
                "Kliknij w ten link: http://localhost:3000/verify?code=" +
                verifyHash,
            })
            .then((res) => {
              console.log(res);
            });
        });
        return {
          token,
        };
      } catch (e) {
        console.log(e);
      }
    },
    verifyUser: async (_: unknown, args: { verifyHash: string }) => {
      try {
        await query("SELECT user_id FROM users_verified WHERE hash = ?", [
          args.verifyHash,
        ]).then(async (res) => {
          await query("UPDATE users SET verified = 1 WHERE id = ?", [
            res[0].user_id,
          ]).then(async () => {
            await query("DELETE FROM users_verified WHERE hash = ?", [
              args.verifyHash,
            ]);
          });
        });
        return {
          verifyHash: args.verifyHash,
        };
      } catch (e) {
        e.message ? e.message : GlobalErrors.STH_WENT_WRONG;
        throw new Error(VerifyErrors.INVALID_HASH);
      }
    },

    editUsername: async (
      _: unknown,
      args: {
        username: string;
        email: string;
      }
    ) => {
      try {
        await query("UPDATE users SET username = ? WHERE email = ?", [
          args.username,
          args.email,
        ]);
      } catch (e) {
        e.message ? e.message : GlobalErrors.STH_WENT_WRONG;
        throw new Error(GlobalErrors.STH_WENT_WRONG);
        console.log(e);
      }
    },

    editPassword: async (
      _: unknown,
      args: { email: string; currentPassword: string; newPassword: string }
    ) => {
      try {
        const user = await query(
          "SELECT id, password FROM users WHERE email = ? AND verified = 1",
          [args.email]
        );
        if (
          !(await bcrypt.compare(
            args.currentPassword,
            (user[0] as UserType).password
          ))
        )
          throw new Error(ChangePasswordErrors.INVALID_PASSWORD);
        else {
          let passwordRegex = new RegExp(
            "(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$"
          );
          if (passwordRegex.test(args.newPassword)) {
            const hashedPassword = await bcrypt.hash(args.newPassword, 10);
            await query("UPDATE users SET password = ? WHERE email = ?", [
              hashedPassword,
              args.email,
            ]);
          } else throw new Error(ChangePasswordErrors.INVALID_NEW_PASSWORD);
        }
      } catch (e) {
        throw new Error(e.message ? e.message : GlobalErrors.STH_WENT_WRONG);
      }
    },
    loginUser: async (
      _: unknown,
      args: { email: string; password: string }
    ) => {
      try {
        const regex = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/;
        if (!validator.isEmail(args.email) || !regex.test(args.password))
          throw new UserInputError(LoginErrors.WRONG_CREDENTIALS);

        const user = await query(
          "SELECT id, password FROM users WHERE email = ? AND verified = 1",
          [args.email]
        );
        if (user.length === 0)
          throw new AuthenticationError(LoginErrors.WRONG_CREDENTIALS);
        const match = await bcrypt.compare(
          args.password,
          (user[0] as UserType).password
        );

        if (!match)
          throw new AuthenticationError(LoginErrors.WRONG_CREDENTIALS);

        const refreshToken = jwt.sign(
          { id: (user[0] as UserType).id },
          `${process.env.REFRESH_TOKEN_SECRET}`
        );
        const accessToken = jwt.sign(
          { id: (user[0] as UserType).id },
          `${process.env.ACCESS_TOKEN_SECRET}`,
          { expiresIn: "5m" }
        );
        await query("INSERT INTO refresh_tokens VALUES (?, ?)", [
          refreshToken,
          (user[0] as UserType).id,
        ]).then((res) => {
          console.log(res);
        });
        return {
          refreshToken,
          accessToken,
        };
      } catch (e) {
        throw new Error(e.message ? e.message : GlobalErrors.STH_WENT_WRONG);
      }
    },

    getUserData: async (_: unknown, args: { refreshToken: string }) => {
      try {
        const decoded = jwt.verify(
          args.refreshToken,
          `${process.env.REFRESH_TOKEN_SECRET}`
        );
        const user = await query(
          "SELECT * FROM users WHERE id = ? AND verified = 1",
          [decoded.id]
        );
        const email = user[0].email;
        const username = user[0].username;

        let avatar = await query(
          "SELECT * FROM users_avatars WHERE id_user = ?",
          [decoded.id]
        );
        if (avatar[0] == undefined)
          avatar =
            "https://res.cloudinary.com/dukhbkqnv/image/upload/v1618869557/default-avatar-1_jzug3b.jpg";
        else avatar = avatar[0].link;

        let travels = await query(
          "SELECT image_url FROM travel_images INNER JOIN travels ON travel_images.travel_id = travels.id WHERE user_id = ?",
          [decoded.id]
        );

        return {
          email,
          avatar,
          username,
          travels,
        };
      } catch (e) {
        throw new Error(e.message ? e.message : GlobalErrors.STH_WENT_WRONG);
      }
    },
    addTravel: async (_: unknown, args: AddTravelArgs) => {
      try {
        if (!args.refreshToken)
          throw new ForbiddenError(LoginErrors.WRONG_CREDENTIALS);

        const refreshToken = jwt.verify(
          args.refreshToken,
          `${process.env.REFRESH_TOKEN_SECRET}`
        );

        const id = (refreshToken as VerifyToken).id;
        const user = await query(
          "SELECT id FROM users WHERE id = ? AND verified = 1",
          [id]
        );

        if (user.length === 0)
          throw new AuthenticationError(LoginErrors.WRONG_CREDENTIALS);

        const travelPrivate: number = args.travel.private ? 1 : 0;
        const hash = crypto.randomBytes(20).toString("hex");
        const insertTravel = await query(
          "INSERT INTO travels (id, name, description, user_id, private, hash, payAttention, startTime, endTime) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            args.travel.name,
            args.travel.description,
            id,
            travelPrivate,
            hash,
            args.travel.payAtention,
            args.travel.startTime,
            args.travel.endTime,
          ]
        );
        if (insertTravel.affectedRows !== 1) throw new Error();

        const travel = await query("SELECT id from travels WHERE hash = ?", [
          hash,
        ]);
        if (travel.length === 0) throw new Error();

        for (let file of args.files) {
          const uploadResult = await cloudinary.v2.uploader.upload(
            file.base64,
            { upload_preset: "travels" }
          );
          await query("INSERT INTO travel_images VALUES (NULL, ?, ?, ?)", [
            travel[0].id,
            uploadResult.url,
            file.desc,
          ]);
        }

        if (args.travel.users.length !== 0) {
          for (let user of args.travel.users) {
            await query("INSERT INTO travel_tags VALUES (NULL, ?, ?)", [
              travel[0].id,
              user.id,
            ]);
          }
        }

        return "Podróż została dodana pomyślnie";
      } catch (e) {
        throw new Error(e.message ? e.message : GlobalErrors.STH_WENT_WRONG);
      }
    },

    changeUserPhoto: async (
      _: unknown,
      args: { refreshToken: string; file: string }
    ) => {
      try {
        let linkImage = "";
        let photo = "";
        cloudinary.v2.config({
          cloud_name: process.env.CLOUDINARY_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        cloudinary.v2.uploader
          .upload(args.file, {
            upload_preset: "ml_default",
          })
          .then((res) => {
            const decoded = jwt.verify(
              args.refreshToken,
              `${process.env.REFRESH_TOKEN_SECRET}`
            );
            linkImage = res.url;

            query("SELECT * FROM users_avatars WHERE id_user = ?", [
              decoded.id,
            ]).then((res) => {
              if (res == undefined) {
                let queryInsertPhoto = query(
                  "INSERT INTO users_avatars (id_user, link) VALUES (?,?)",
                  [decoded.id, linkImage]
                );
              } else {
                let queryUpdatePhoto = query(
                  "UPDATE users_avatars SET link=? WHERE id_user=?",
                  [linkImage, decoded.id]
                ).then((res) => {});
              }
            });
          });
        return {
          photo,
        };
      } catch (e) {
        throw new Error(e.message ? e.message : GlobalErrors.STH_WENT_WRONG);
      }
    },
    likeTravel: async (
      _: unknown,
      args: { travelID: number; refreshToken: string },
      { pubsub }: Context
    ) => {
      try {
        if (!args.refreshToken)
          throw new ForbiddenError(LoginErrors.NOT_LOGGED_IN);

        const refreshToken = jwt.verify(
          args.refreshToken,
          `${process.env.REFRESH_TOKEN_SECRET}`
        );

        const id = (refreshToken as VerifyToken).id;
        const user = await query(
          "SELECT id FROM users WHERE id = ? AND verified = 1",
          [id]
        );

        if (user.length === 0)
          throw new AuthenticationError(LoginErrors.NOT_LOGGED_IN);

        const travelLiked = await query(
          "SELECT * FROM travel_likes WHERE travel_id = ? AND user_id = ?",
          [args.travelID, id]
        );

        if (travelLiked.length !== 0) return false;

        await query("INSERT INTO travel_likes VALUES(NULL, ?, ?)", [
          args.travelID,
          id,
        ]);

        const travelLikes = await query(
          "SELECT COUNT(*) AS travelLikes FROM travel_likes WHERE travel_id = ? AND user_id = ?",
          [args.travelID, id]
        );

        pubsub.publish(SubscriptionsTypes.TRAVEL_LIKED, {
          travelLiked: travelLikes[0].travelLikes,
          travelID: args.travelID,
        });

        return true;
      } catch (e) {
        throw new Error(e.message ? e.message : GlobalErrors.STH_WENT_WRONG);
      }
    },
  },
  Subscription: {
    travelLiked: {
      subscribe: withFilter(
        (_: unknown, __: unknown, { pubsub }: Context) =>
          pubsub.asyncIterator([SubscriptionsTypes.TRAVEL_LIKED]),
        (payload, variables) => {
          return payload.travelID === variables.travelID;
        }
      ),
    },
  },
};

export default resolvers;
