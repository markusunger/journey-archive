import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import { disconnect } from 'mongoose';
import { buildDbFromAssets } from './scripts/buildDbFromAssets';
import { apiRouter } from './apiRoutes';
import { db } from './db';

dotenv.config();
(async () => await db())();

const app = express();
app.disable('x-powered-by');

app.set('trust proxy', 1);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: 'auto'
        }
    })
);

app.use(
    cors({
        origin: [/localhost:3000/, /unger\.dev$/],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

app.use(express.urlencoded());
app.use(express.json());
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
