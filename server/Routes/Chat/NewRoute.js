import express from 'express'
import { newConversation, newMessage } from '../../Controllers/Chat/NewControllers.js'

const router = express.Router()

router.post('/conversation', newConversation)
router.post('/message', newMessage)

export default router