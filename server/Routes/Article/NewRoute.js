import express from 'express'
import { newDept, newSubject, newArticle, newComment } from '../../Controllers/Article/NewControllers.js'

const router = express.Router()

router.post('/dept', newDept)
router.post('/subject', newSubject)
router.post('/article', newArticle)
router.post('/comment', newComment)

export default router