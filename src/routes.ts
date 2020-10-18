import { Router } from 'express';
import { authMiddleware } from './lib/authMiddleware';
import Journey from './models/journey';

export const router = Router();

/* 
  INDEX PAGE
*/

router.get('/', authMiddleware, async (req, res) => {
    const entries = await Journey.find({}).exec();
    res.render('index', { entries });
});

/*
  LOGIN
*/

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { password } = req.body;
    if (req.session) req.session.auth = password;
    res.redirect('/');
});
