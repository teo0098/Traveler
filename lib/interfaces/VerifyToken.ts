import { VerifyOptions } from 'jsonwebtoken'

export interface VerifyToken extends VerifyOptions {
    id: number;
}