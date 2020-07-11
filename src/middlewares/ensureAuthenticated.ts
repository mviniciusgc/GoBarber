import { Request, Response, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}


export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {

    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error("JWT token is missing");
    }

    const token = authHeader;
    try {

        const decod = verify(token, authConfig.JWT.secret);
        const { sub } = decod as TokenPayload;
        request.user = { id: sub }



        return next();
    } catch (err) {
        throw new Error('Invalid JWT token');
    }
}