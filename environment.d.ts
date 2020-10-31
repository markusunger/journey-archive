declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            NODE_PORT: number;
            MONGO_HOST: string;
            MONGO_PORT: number;
            MONGO_DB: string;
            MONGO_USER: string;
            MONGO_PASSWORD: string;
            SESSION_SECRET: string;
            LOGIN_PASSWORD: string;
        }
    }
}

export {};
