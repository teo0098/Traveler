import bcrypt from 'bcrypt';
import {query} from '../../db/db';
import jwt from 'jsonwebtoken';


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

        }
    }
}

export default resolvers