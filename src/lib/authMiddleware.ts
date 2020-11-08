import { RequestHandler } from 'express';

// auth middleware for api routes
export const authMiddleware: RequestHandler = (req, res, next) => {
    if (!req.session?.auth) {
        return res.status(401).json({ error: 'unauthorized' });
    }
    return next();
};
