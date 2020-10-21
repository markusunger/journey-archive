import { Router } from 'express';
import { authMiddleware } from './lib/authMiddleware';
import Journey from './models/journey';

export const apiRouter = Router();

apiRouter.use('/', authMiddleware);

/*
 API ROUTES
*/

apiRouter.get('/entries', async (req, res) => {
    try {
        const entries = await Journey.find({}).exec();
        res.status(200).json({ entries });
    } catch (error) {
        res.status(500).json({ error });
    }
});

apiRouter.get('/entries/:id/fav', async (req, res) => {
    const { id } = req.params;
    try {
        const entry = await Journey.findById(id).exec();
        if (!entry) return res.status(500).json({ error: 'id not found' });
        entry.favourite = !entry.favourite;
        const newEntry = await entry.save();
        res.status(200).json(newEntry);
    } catch (error) {
        res.status(500).json({ error });
    }
});

apiRouter.get('/details/:id', async (req, res) => {
    const entry = await Journey.findById(req.params.id).exec();
    res.json({ entry });
});
