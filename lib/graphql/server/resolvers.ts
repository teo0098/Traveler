import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator'
import { UserInputError, AuthenticationError } from 'apollo-server-micro'

import {query} from '../../db/db';
import { AddTravelArgs, UserType } from '../../types/types';
import { GlobalErrors, LoginErrors } from './errors';
import { cloudinary } from '../../cloudinary/cloudinary'

const resolvers = {
    Mutation: {
        registerUser: async (root: {}, args: { password: string; username: string; email: string }, context: {}, info: {}) => {
            const SECRET: string = process.env.SECRET!;
            const token = jwt.sign({username: args.username}, SECRET);
            let passwordRegex = new RegExp("(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$");
            let hashedPassword = "";

            if (passwordRegex.test(args.password))
                hashedPassword = await bcrypt.hash(args.password, 10);
            else
                throw new Error("Password must contains at least: 8 characters, 1 uppercase & lowercase & number and special character");

            await query('SELECT username FROM users WHERE username = ?', [args.username]).then(res => {
                if (res.length > 0) {
                    throw new Error(
                        "User exists!"
                    );
                }
            })
            await query('INSERT INTO users (username, password, email) VALUES (?,?,?)', [args.username, hashedPassword, args.email])
            return {
                token
            };

        },
        loginUser: async (_ : unknown, args: { email : string, password: string }) => {
            try {
                const regex = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/
                if (!validator.isEmail(args.email) || !regex.test(args.password))
                    throw new UserInputError(LoginErrors.WRONG_CREDENTIALS)
                
                const user = await query('SELECT id, password FROM users WHERE email = ? AND verified = 1', [args.email])
                if (user.length === 0) throw new AuthenticationError(LoginErrors.WRONG_CREDENTIALS)

                const match = await bcrypt.compare(args.password, (user[0] as UserType).password)
                if (!match) throw new AuthenticationError(LoginErrors.WRONG_CREDENTIALS)

                const refreshToken = jwt.sign({ id: (user[0] as UserType).id }, `${process.env.REFRESH_TOKEN_SECRET}`)
                const accessToken = jwt.sign({ id: (user[0] as UserType).id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '5m' })

                const insertRefreshToken = await query('INSERT INTO refresh_tokens VALUES (NULL, ?, ?)', [refreshToken, (user[0] as UserType).id])
                if (insertRefreshToken.affectedRows !== 1) throw new Error()

                return {
                    refreshToken,
                    accessToken
                }
            }
            catch (e) {
                throw new Error(e.message ? e.message : GlobalErrors.STH_WENT_WRONG)
            }
        },
        addTravel: async (_ : unknown, args : AddTravelArgs) => {
            try {
                args.files.forEach(async file => {
                    const uploadResult = await cloudinary.v2.uploader.upload(file.base64, { upload_preset: 'travels' })
                })
                return 'Podróż została dodana pomyślnie'
            }
            catch (e) {
                throw new Error(e.message ? e.message : GlobalErrors.STH_WENT_WRONG)
            }
        }
    }
}

export default resolvers