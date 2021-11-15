import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export const isDesktopApp = 0

const SERVER_PORT = process.env.SERVER_PORT || 5000
export const SERVER_URL = `http://localhost:${SERVER_PORT}`
export const IMG_URL = SERVER_URL + '/images/'

const SOCKET_PORT = process.env.SOCKET_PORT || 8000
export const WEB_SOCKET_URL = `ws://localhost:${SOCKET_PORT}`

export const API = axios.create({
    baseURL: SERVER_URL
})