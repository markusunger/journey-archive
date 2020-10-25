import { RequestHandler } from 'express';

// auth middleware for api routes
export const authMiddleware: RequestHandler = (req, res, next) => {
    const { jauth } = req.cookies;
    if (!jauth || jauth !== process.env.COOKIE_SECRET) {
        return res.status(401).json({ error: 'unauthorized' });
    }
    return next();
};
