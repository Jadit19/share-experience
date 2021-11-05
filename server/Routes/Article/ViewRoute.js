import express from 'express'
import { getAllDepts, getAllSubjects, getAllArticles, getOneArticle, getAllComments } from '../../Controllers/Article/ViewControllers.js'

const router = express.Router()

router.get('/allDepts', getAllDepts)
router.get('/allSubjects/:deptSlug', getAllSubjects)
router.get('/allArticles/:deptSlug/:subjectSlug', getAllArticles)
router.get('/article/:deptSlug/:subjectSlug/:articleSlug', getOneArticle)
router.get('/allComments/:articleId', getAllComments)

export default router