import express, { application } from 'express'
import NewRoute from './NewRoute.js'
import ViewRoute from './ViewRoute.js'

const router = express.Router()

router.get('/', async (req, res) => {
    return res.status(200).send('Chat Route')
})
router.use('/new', NewRoute)
router.use('/view', ViewRoute)

export default router