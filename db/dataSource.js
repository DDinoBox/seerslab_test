import { DataSource } from "typeorm"
import { User } from "User.js"

import dotenv from 'dotenv'

dotenv.config();

export const dataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [User],
    migrations: ['migrations/*/js']
})