import { Router } from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import { authMiddleware } from './lib/authMiddleware';
import Journey from './models/journey';

export const apiRouter = Router();

apiRouter.use(cookieParser());

/*
 API ROUTES
*/

apiRouter.post('/login', (req, res) => {
    const { password } = req.body;
    if (req.session && password && bcrypt.compareSync(password, process.env.LOGIN_PASSWORD as string)) {
        req.session.auth = true;
        res.status(200).json({ login: true });
    } else {
        res.status(401).json({ error: 'Wrong password' });
    }
});

apiRouter.get('/entries', authMiddleware, async (req, res) => {
    try {
        const entries = await Journey.find({}).exec();
        res.status(200).json({ entries });
    } catch (error) {
        res.status(500).json({ error });
    }
});

apiRouter.post('/entries/:id/fav', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const entry = await Journey.findOne({ id }).exec();
        if (!entry) return res.status(500).json({ error: 'id not found' });
        entry.favourite = !entry.favourite;
        const newEntry = await entry.save();
        res.status(200).json(newEntry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

apiRouter.get('/details/:id', authMiddleware, async (req, res) => {
    const entry = await Journey.findById(req.params.id).exec();
    res.json({ entry });
});

apiRouter.post('/entries/:id/update', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    if (!text || !id) {
        res.status(400).json({ error: 'Missing valid id and/or text' });
    }
    try {
        const entry = await Journey.findOne({ id }).exec();
        if (!entry) return res.status(500).json({ error: 'id not found' });
        entry.updateFromAuthor = text;
        const updatedEntry = await entry.save();
        res.status(200).json({ entry: updatedEntry });
    } catch (error) {
        res.status(500).json({ error });
    }
});
