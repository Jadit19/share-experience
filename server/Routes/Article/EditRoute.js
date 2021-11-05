import express from 'express'
import { editArticle, editComment, likeArticle } from '../../Controllers/Article/EditControllers.js'

const router = express.Router()

router.put('/article', editArticle)
router.put('/comment', editComment)
router.put('/likeArticle', likeArticle)

export default router