import { Router } from 'express';
import { authMiddleware } from './lib/authMiddleware';
import Journey from './models/journey';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;

export const router = Router();

/* 
  INDEX PAGE
*/

router.get('/', authMiddleware, async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page.toString(), 10) : DEFAULT_PAGE;
    const perPage = req.query.perPage ? parseInt(req.query.perPage.toString(), 10) : DEFAULT_PER_PAGE;

    const entries = await Journey.find({}, null, { skip: (page - 1) * perPage, limit: perPage }).exec();
    const totalEntries = await Journey.countDocuments();

    res.render('index', {
        entries,
        startIndex: (page - 1) * perPage + 1,
        activePage: page,
        displayPrevLink: page !== 0,
        displayNextLink: page * perPage < totalEntries,
        pages: Array(Math.floor(totalEntries / perPage))
            .fill(0)
            .map((_, idx) => idx + 1)
    });
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
