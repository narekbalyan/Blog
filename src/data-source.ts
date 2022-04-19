import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Record } from "./entity/Record";
import {config} from "dotenv";

config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: 5432,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    synchronize: true,
    logging: false,
    entities: [User, Record],
    migrations: [],
    subscribers: [],
});
