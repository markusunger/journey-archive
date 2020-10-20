import { Router } from 'express';
import { authMiddleware } from './lib/authMiddleware';

export const router = Router();

/* 
  INDEX PAGE
*/

router.get('/', authMiddleware, async (req, res) => {
    res.render('index');
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
