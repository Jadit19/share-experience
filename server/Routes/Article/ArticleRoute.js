import express from 'express'
import NewRoute from './NewRoute.js'
import ViewRoute from './ViewRoute.js'
import EditRoute from './EditRoute.js'
import DeleteRoute from './DeleteRoute.js'

const router = express.Router()

router.use('/new', NewRoute)
router.use('/view', ViewRoute)
router.use('/edit', EditRoute)
router.use('/delete', DeleteRoute)

export default router