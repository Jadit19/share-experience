import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
const CONNECTION_URL = 'mongodb://localhost:27017/share-trial-6'

import UserRoutes from './routes/UserRoutes.js'
import ArticleRoutes from './routes/ArticleRoutes.js'

//! MIDDLEWARES..
app.use(express.json({
    limit: '30mb',
    extended: true
}))
app.use(express.urlencoded({
    limit: '30mb',
    extended: true
}))
app.use(cors())
app.use('/user', UserRoutes)
app.use('/article', ArticleRoutes)

//! DATABASE CONNECTION..
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DataBase Connected Successfully!!');
}).catch((err) => {
    console.log('Oh no! Error:');
    console.log(err);
})

//! ROUTES..
app.get('/', (req, res) => {
    res.send('My API')
})

//! LISTENING..
app.listen(PORT, () => {
    console.log(`Listening on port #${PORT}..`)
})