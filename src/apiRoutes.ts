import { Router } from 'express';
import { authMiddleware } from './lib/authMiddleware';
import Journey from './models/journey';

export const apiRouter = Router();

apiRouter.use('/', authMiddleware);

/*
  ENTRY DETAILS
*/

apiRouter.get('/details/:id', async (req, res) => {
    const entry = await Journey.findOne({ id: req.params.id });

    res.json({ entry });
});
