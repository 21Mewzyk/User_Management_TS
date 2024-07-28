import dotenv from 'dotenv';
dotenv.config();

interface DBConfig {
    host: string;
    user: string;
    password: string;
    name: string;
    dialect: string;
}

interface ServerConfig {
    port: number | string;
}

interface Config {
    db: DBConfig;
    server: ServerConfig;
}

const config: Config = {
    db: {
        host: process.env.DB_HOST as string,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        name: process.env.DB_NAME as string,
        dialect: process.env.DB_DIALECT || 'mysql',
    },
    server: {
        port: process.env.PORT || 3000,
    },
};

export default config;
