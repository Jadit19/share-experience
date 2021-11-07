import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import AuthRouter from './Routes/User/AuthRoute.js'
import UserRouter from './Routes/User/UserRoute.js'
import ArticleRouter from './Routes/Article/ArticleRoute.js'
import ChatRouter from './Routes/Chat/ChatRoute.js'
import { SERVER_PORT, MONGO_URL } from './config.js'

//! Configuration
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

//! Middlewares
app.use(cors())
app.use(express.json({
    limit: '30mb',
    extended: true
}))
app.use(express.urlencoded({
    limit: '30mb',
    extended: true
}))
app.use('/images', express.static(path.join(__dirname, "Public/Pictures")))

//! Database Connection
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Database Connected Successfully!')
})
.catch((err) => {
    console.log('Oh No! Error:')
    console.log(err)
})

//! Routes
app.get('/', async (req, res) => {
    res.status(200).send('My API')
})

//! File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Public/Pictures")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.fileName)
    }
})
const upload = multer({
    storage: storage
})
app.post('/uploadFile', upload.single("file"), async (req, res) => {
    return res.status(200)
})

app.use('/auth', AuthRouter)
app.use('/user', UserRouter)
app.use('/article', ArticleRouter)
app.use('/chat', ChatRouter)

//! Listening
app.listen(SERVER_PORT, () => {
    console.log(`Listening on port #${SERVER_PORT}..`)
})