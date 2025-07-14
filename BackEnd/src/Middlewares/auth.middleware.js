import jwt from 'jsonwebtoken';
import { env } from '../Config/env.config.js';

export const authMiddleware = (req, res, next) => {
    try{
        const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }

            if(!decoded) {
                return res.status(401).json({ message: 'Unauthorized: Session expired' });
            }

            req.userId = decoded.id;
            next();
        });
    }catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};