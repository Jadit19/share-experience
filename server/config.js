import dotenv from 'dotenv'
dotenv.config()

export const SERVER_PORT = process.env.SERVER_PORT
export const MONGO_URL = process.env.MONGO_URL
export const MAIL_ID = process.env.MAIL_ID
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD
export const MAIL_PROVIDER = process.env.MAIL_PROVIDER