import { connect, connection } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const { MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_USER, MONGO_PASSWORD } = process.env;

export const db = async (): Promise<void> => {
    try {
        await connect(
            `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                connectTimeoutMS: 10000,
                useCreateIndex: true,
                useFindAndModify: false
            }
        );
    } catch (e) {
        console.error(e);
    }

    connection.on('error', (error: Error) => console.error(error));
};
