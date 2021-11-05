import Dept from '../../Models/DeptModel.js'
import Subject from '../../Models/SubjectModel.js'
import Article from '../../Models/ArticleModel.js'
import Comment from '../../Models/CommentModel.js'

import { findDept, findSubject, findArticle } from './FindingFunctions.js'

//! Get All Departments (STATUS: OK)
export const getAllDepts = async (req, res) => {
    try {
        const allDepts = await Dept.find()
        return res.status(200).json(allDepts)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}

//! Get All Subjects (STATUS: OK)
export const getAllSubjects = async (req, res) => {
    const { deptSlug } = req.params
    try {
        if (!(await findDept(deptSlug))){
            return res.status(404).json('Department not found!')
        }

        const allSubjects = await Subject.find({
            deptSlug: deptSlug
        })
        return res.status(200).json(allSubjects)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}

//! Get All Articles (STATUS: OK)
export const getAllArticles = async (req, res) => {
    const { deptSlug, subjectSlug } = req.params
    try {
        if (!(await findDept(deptSlug))){
            return res.status(404).json('Department not found!')
        }
        if (!(await findSubject(deptSlug, subjectSlug))){
            return res.status(404).json('Subject not found!')
        }

        const allArticles = await Article.find({
            deptSlug: deptSlug,
            subjectSlug: subjectSlug
        })
        return res.status(200).json(allArticles)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}

//! Get One Article (STATUS: OK)
export const getOneArticle = async (req, res) => {
    const { deptSlug, subjectSlug, articleSlug } = req.params
    try {
        if (!(await findDept(deptSlug))){
            return res.status(404).json('Department not found!')
        }
        if (!(await findSubject(deptSlug, subjectSlug))){
            return res.status(404).json('Subject not found!')
        }

        const oldArticle = await findArticle(deptSlug, subjectSlug, articleSlug)
        if (!oldArticle){
            return res.status(404).json('Article not found!')
        }
        return res.status(200).json(oldArticle)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}

//! Get All Comments (STATUS: OK)
export const getAllComments = async (req, res) => {
    const { articleId } = req.params
    try {
        const oldArticle = await Article.findById(articleId)
        if (!oldArticle){
            return res.status(404).json("Couldn't find article!")
        }
        
        const allComments = await Comment.find({
            articleId: articleId
        })
        return res.status(200).json(allComments)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}