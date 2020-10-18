import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import Handlebars from 'handlebars';
import create from 'express-handlebars';
import session from 'express-session';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { disconnect } from 'mongoose';
import { getCookieExpirationDate } from './lib/getCookieExpirationDate';
import { handlebarHelpers } from './lib/handlebarHelpers';
import { buildDbFromAssets } from './scripts/buildDbFromAssets';
import { apiRouter } from './apiRoutes';
import { router } from './routes';
import { db } from './db';

dotenv.config();
(async () => await db())();

const app = express();
app.disable('x-powered-by');

app.set('views', path.resolve(__dirname, '../views'));
app.set('trust proxy', 1);
app.engine(
    'hbs',
    create({
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: handlebarHelpers
    })
);
app.set('view engine', 'hbs');

app.use(
    session({
        saveUninitialized: true,
        resave: true,
        name: 'jsession',
        cookie: {
            secure: 'auto',
            maxAge: 3600,
            expires: getCookieExpirationDate()
        },
        secret: process.env.COOKIE_SECRET as string
    })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use('/api', apiRouter);

app.listen(process.env.NODE_PORT, async () => {
    await buildDbFromAssets();
    console.log('Server running ...');
});

const gracefulShutdown = async (e: Error) => {
    console.error(e);
    await disconnect();
    process.exit();
};

process.on('SIGINT', gracefulShutdown);
process.on('uncaughtException', gracefulShutdown);
process.on('unhandledRejection', gracefulShutdown);
