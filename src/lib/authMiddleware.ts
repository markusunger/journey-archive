import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';

// auth middleware for express routes
export const authMiddleware: RequestHandler = (req, res, next) => {
    if (req.session?.auth && bcrypt.compareSync(req.session.auth, process.env.LOGIN_PASSWORD as string)) {
        return next();
    } else {
        if (req.baseUrl == '/api') {
            return res.json({ error: 'error' });
        } else {
            return res.redirect('/login');
        }
    }
};
