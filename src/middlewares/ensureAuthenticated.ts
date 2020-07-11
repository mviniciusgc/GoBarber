import { Request, Response, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../erros/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}


export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {

    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError("JWT token is missing",401);
    }

    const token = authHeader;
    try {

        const decod = verify(token, authConfig.JWT.secret);
        const { sub } = decod as TokenPayload;
        request.user = { id: sub }



        return next();
    } catch (err) {
        throw new AppError('Invalid JWT token',401);
    }
}