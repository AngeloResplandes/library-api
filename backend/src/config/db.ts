import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.SQLITE_STORAGE || './database/biblioteca.db',
    logging: false
})