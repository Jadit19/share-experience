import express from 'express'
import { getConversation, getMessages } from '../../Controllers/Chat/ViewControllers.js'

const router = express.Router()

router.get('/conversation/:userId', getConversation)
router.get('/messages/:convId/:userId', getMessages)

export default router