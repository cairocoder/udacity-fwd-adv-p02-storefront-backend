import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyAuth = (request: Request, response: Response, next: () => void) => {
    try {
        const authorizationHeader = request.headers.authorization;
        if (typeof authorizationHeader !== 'undefined') {
            const token = authorizationHeader.split(' ')[1];
            process.env.TOKEN_SECRET &&
                jwt.verify(token, process.env.TOKEN_SECRET);
        }
        next();
    } catch (error) {
        response.status(401);
        response.json('Access denied, invalid token');
    }
};

export default verifyAuth;
