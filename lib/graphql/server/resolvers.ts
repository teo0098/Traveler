import bcrypt from "bcrypt";
import { query } from "../../db/db";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { GlobalErrors, VerifyErrors } from "./errors";

const resolvers = {
  Mutation: {
    registerUser: async (
      _: unknown,
      args: {
        password: string;
        username: string;
        email: string;
      }
    ) => {
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
        await query("INSERT INTO users_verified (user_id, hash) VALUES (?,?)", [
          userID,
          verifyHash,
        ]);

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
            console.log(res); //Walidacja
          });
      });
      return {
        token,
      };
    },
    verifyUser: async (_: unknown, args: { verifyHash: string }) => {
      try {
        await query("SELECT user_id FROM users_verified WHERE hash = ?", [
          args.verifyHash,
        ]).then(async (res) => {
          if (res.length == 0) {
            throw new Error(VerifyErrors.INVALID_HASH);
          } else {
            await query("UPDATE users SET verified = 1 WHERE id = ?", [
              res[0].user_id,
            ]).then(async (res) => {
              await query(
                "DELETE FROM users_verified WHERE hash = ?",
                args.verifyHash
              );
            });
          }
        });
        return {
          verifyHash: args.verifyHash,
        };
      } catch (e) {
        e.message ? e.message : GlobalErrors.STH_WENT_WRONG;
        throw new Error();
      }
    },
  },
};

export default resolvers;
