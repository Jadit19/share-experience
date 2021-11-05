import Dept from '../../Models/DeptModel.js'
import Subject from '../../Models/SubjectModel.js'
import Article from '../../Models/ArticleModel.js'
import Comment from '../../Models/CommentModel.js'

import { findDept, findSubject, findArticle } from './FindingFunctions.js'

//! New Department (STATUS: OK)
export const newDept = async (req, res) => {
    const { deptName: dName } = req.body
    const deptName = dName.toUpperCase()
    try {
        const newDept = new Dept({
            deptName: deptName
        })
        const savedDept = await newDept.save()
        return res.status(200).json(savedDept)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}

//! New Subject (STATUS: OK)
export const newSubject = async (req, res) => {
    const { deptSlug, subjectName: sName } = req.body
    const subjectName = sName.toUpperCase()
    try {
        if (!(await findDept(deptSlug))){
            return res.status(404).json("Department dosen't exist!")
        }
        
        const newSubject = new Subject({
            deptSlug: deptSlug,
            subjectName: subjectName
        })
        const savedSubject = await newSubject.save()
        return res.status(200).json(savedSubject)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}

//! New Article (STATUS: OK)
export const newArticle = async (req, res) => {
    const { deptSlug, subjectSlug, articleName, content, authorName, authorId } = req.body
    try {
        if (!(await findDept(deptSlug))){
            return res.status(404).json("Department dosen't exist!")
        }
        if (!(await findSubject(deptSlug, subjectSlug))){
            return res.status(404).json("Subject dosen't exist!")
        }

        const newArticle = new Article({
            deptSlug: deptSlug,
            subjectSlug: subjectSlug,
            articleName: articleName,
            content: content,
            authorName: authorName,
            authorId: authorId
        })
        const savedArticle = await newArticle.save()
        return res.status(200).json(savedArticle)
    } catch (error){
        console.log(error)
        res.status(500).json(error)
    }
}

//! New Comment (STATUS: OK)
export const newComment = async (req, res) => {
    const { articleId, content, authorName, authorId } = req.body
    try {
        const oldArticle = Article.findById(articleId)
        if (!oldArticle){
            return res.status(404).json('Article not found!')
        }

        const newComment = new Comment({
            articleId: articleId,
            content: content,
            authorId: authorId,
            authorName: authorName
        })
        const savedComment = await newComment.save()
        return res.status(200).json(savedComment)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}