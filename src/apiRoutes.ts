import { Router } from 'express';
import { authMiddleware } from './lib/authMiddleware';
import Journey from './models/journey';

export const apiRouter = Router();

apiRouter.use('/', authMiddleware);

/*
 API ROUTES
*/

apiRouter.get('/entries', async (req, res) => {
    const entries = await Journey.find({}).exec();
    try {
        res.status(200).json({ entries });
    } catch (error) {
        res.status(500).json({ error });
    }
});

apiRouter.get('/details/:id', async (req, res) => {
    const entry = await Journey.findById(req.params.id).exec();
    res.json({ entry });
});
