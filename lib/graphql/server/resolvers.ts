import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator'
import { UserInputError, AuthenticationError } from 'apollo-server-micro'

import {query} from '../../db/db';
import { UserType } from '../../types/types';

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
                    throw new UserInputError('Wrong credentials')
                
                const user = await query('SELECT * FROM users WHERE email = ? AND verified = 1', [args.email])
                if (user.length === 0) throw new AuthenticationError('Wrong credentials')

                const match = await bcrypt.compare(args.password, (user[0] as UserType).password)
                if (!match) throw new AuthenticationError('Wrong credentials')

                const refreshToken = jwt.sign({ id: (user[0] as UserType).id }, `${process.env.REFRESH_TOKEN_SECRET}`)
                const accessToken = jwt.sign({ id: (user[0] as UserType).id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '5m' })

                const insertRefreshToken = await query('UPDATE users SET refreshToken = ?', [refreshToken])
                if (insertRefreshToken.changedRows != 1) throw new Error()

                return {
                    refreshToken,
                    accessToken
                }
            }
            catch (e) {
                throw new Error(e.message ? e.message : 'Something went wrong... Please try again later')
            }
        }
    }
}

export default resolvers