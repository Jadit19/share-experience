import Dept from "../models/DeptModel.js"
import Subject from "../models/SubjectModel.js"
import Article from "../models/ArticleModel.js"
import Comment from "../models/CommentModel.js"

export const getAllDept = async (req, res) => {
    const allDept = await Dept.find()
    res.send(allDept)
}

export const newDept = async (req, res) => {
    // console.log(req.body)
    const { deptName } = req.body

    try {
        const newDept = await Dept({
            deptName
        })
        // console.log(newDept)
        await newDept.save()

        res.status(201).json(newDept)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error!' })
    }
}

export const deptSubjects = async (req, res) => {
    const deptSlug = req.params.deptSlug
    // console.log(deptSlug)
    
    // const allDept = await Dept.find()
    // console.log(allDept)

    try {
        const dept = await Dept.findOne({ slug: deptSlug })
        // console.log(dept)

        if (dept === null){
            res.status(404).json({ messgage: 'Dept not found!!' })
        }

        const deptSubjects = await Subject.find({ deptSlug: req.params.deptSlug })

        res.status(200).json({ dept: dept, subjects: deptSubjects })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const newSubject = async (req, res) => {
    // console.log(req.params.deptSlug)
    // console.log(req.body)
    
    const dept = await Dept.findOne({ slug: req.body.deptSlug })
    // console.log(dept)
    if (dept === null){
        // console.log('Not found')
        res.status(404).json({ message: `Department with slug: ${req.body.deptName} not found..` })
    }
    
    try {
        const newSubject = await Subject({
            subjectName: req.body.subjectName,
            deptSlug: req.body.deptSlug
        })

        await newSubject.save()
        // console.log(newSubject)

        res.status(200).json(newSubject)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
}

export const newArticle = async (req, res) => {
    // console.log(req.body)
    const { deptSlug, subjectSlug, title, username, markdown } = req.body

    const oldArticle = await Article.findOne({
        deptSlug: deptSlug,
        subjectSlug: subjectSlug,
        title: title
    })
    if (oldArticle){
        // console.log('Article already exists!!')
        res.status(400).json({ message: 'Article with same name already exists!!' })
        return
    }

    try {
        const newArticle = await Article({
            deptSlug: deptSlug,
            subjectSlug: subjectSlug,
            title: title,
            username: username,
            markdown: markdown
        })
        // console.log(newArticle)
        newArticle.save()

        res.status(200).json(newArticle)
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: error.message })
    }
}

export const allArticles = async (req, res) => {
    const { deptSlug, subjectSlug } = req.params
    // console.log(deptSlug, subjectSlug)
    
    const oldDept = await Dept.findOne({ slug: deptSlug })
    if (!oldDept){
        res.status(404).json({ message: 'Department not found!' })
        return
    }

    const oldSubject = await Subject.findOne({ deptSlug: deptSlug, slug: subjectSlug })
    if (!oldSubject){
        res.status(404).json({ message: 'Subject not found!' })
        return
    }

    try {
        const allArticles = await Article.find({
            deptSlug: deptSlug,
            subjectSlug: subjectSlug
        })
        // console.log(allArticles)

        res.status(200).json({ dept: oldDept, subject: oldSubject, articles: allArticles })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const showArticle = async (req, res) => {
    const { deptSlug, subjectSlug, articleSlug } = req.params
    
    const oldDept = await Dept.findOne({ slug: deptSlug })
    if (!oldDept){
        res.status(404).json({ message: 'Invalid Department Name' })
        return
    }

    const oldSubject = await Subject.findOne({ slug: subjectSlug })
    if (!oldSubject){
        res.status(404).json({ message: 'Invalid Subject Name' })
        return
    }

    const oldArticle = await Article.findOne({ slug: articleSlug })
    if (!oldArticle){
        res.status(404).json({ message: 'Invalid Article Name' })
        return
    }

    try {
        const allComments = await Comment.find({
            deptSlug: deptSlug,
            subjectSlug: subjectSlug,
            articleSlug: articleSlug
        }).sort({
            createdAt: 'asc'
        })

        res.status(200).json({ dept: oldDept, subject: oldSubject, article: oldArticle, comments: allComments })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Something went wrong!' })
    }
}

export const newComment = async (req, res) => {
    const { deptSlug, subjectSlug, articleSlug, username, markdown } = req.body

    try {
        const newComment = await Comment({
            deptSlug: deptSlug,
            subjectSlug: subjectSlug,
            articleSlug: articleSlug,
            username: username,
            markdown: markdown
        })
        // console.log(newComment)
        newComment.save()

        res.status(200).json({ comment: newComment })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Something went wrong! X(' })
    }
}

export const deleteArticle = async (req, res) => {
    const { deptSlug, subjectSlug, articleSlug } = req.body

    const oldArticle = await Article.findOne({
        deptSlug: deptSlug,
        subjectSlug: subjectSlug,
        slug: articleSlug
    })
    if (!oldArticle){
        res.status(404).json({ message: 'Article Not Found!' })
        return
    }

    const deletedArticle = await Article.deleteOne({
        deptSlug: deptSlug,
        subjectSlug: subjectSlug,
        slug: articleSlug
    })
    // console.log(deletedArticle)

    const deletedComments = await Comment.deleteMany({
        deptSlug: deptSlug,
        subjectSlug: subjectSlug,
        articleSlug: articleSlug
    })
    // console.log(deletedComments)

    res.status(200).json(req.body)
}