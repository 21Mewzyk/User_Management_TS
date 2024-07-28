import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: string | object;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): Response | void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'Token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }
        req.user = user;
        next();
    });
};
