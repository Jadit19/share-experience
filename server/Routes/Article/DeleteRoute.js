import express from 'express'
import { deleteArticle, deleteComment } from '../../Controllers/Article/DeleteControllers.js'

const router = express.Router()

router.delete('/article/:articleId/:userId', deleteArticle)
router.delete('/comment/:commentId/:userId', deleteComment)

export default router