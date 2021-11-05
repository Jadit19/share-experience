import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
// const SERVER_PORT = process.env.SERVER_PORT
export const SERVER_URL = 'http://localhost:5000'
export const IMG_URL = SERVER_URL + '/images/'

export const API = axios.create({
    baseURL: SERVER_URL
})