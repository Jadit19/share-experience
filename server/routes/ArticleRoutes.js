import express from 'express'

import Dept from '../models/DeptModel.js'
import Subject from "../models/SubjectModel.js"
import Article from "../models/ArticleModel.js"
import Comment from "../models/CommentModel.js"

import { newDept, getAllDept, deptSubjects, newSubject, newArticle, allArticles, showArticle, newComment, deleteArticle } from '../controllers/ArticleController.js'

const router = express.Router()

//! STATUS: OK
router.get('/', getAllDept)

//! STATUS: OK
router.post('/newDept', newDept)

//! STATUS: OK
router.get('/:deptSlug', deptSubjects)

//! STATUS: OK
router.post('/:deptSlug/newSubject', newSubject)

//! STATUS: OK
router.post('/:deptSlug/:subjectSlug/newArticle', newArticle)

//! STATUS: OK
router.get('/:deptSlug/:subjectSlug', allArticles)

//! STATUS: OK
router.get('/:deptSlug/:subjectSlug/:articleSlug/', showArticle)

//! STATUS: OK
router.post('/:deptSlug/:subjectSlug/:articleSlug/newComment', newComment)

//! STATUS: NOT OK
router.post('/delete', deleteArticle)

export default router