const express = require('express');
const Dept = require('../models/dept');
const Subject = require('../models/subject');
const Article = require('../models/article');
const Comment = require('../models/comment');
const methodOverride = require('method-override');
const article = require('../models/article');
const articleRouter = express.Router();

articleRouter.use(methodOverride('__method'));

articleRouter.get('/', async(req,res) => {
    const depts = await Dept.find().sort({
        createdAt: 'desc'
    })    
    res.render('article/deptList', { depts: depts });
    console.log('User now on Dept Page');
})
articleRouter.get('/newDept', (req,res) => {
    res.render('article/newDept');
    console.log('User now on New Dept page')
})
articleRouter.get('/:deptSlug/newSubject', async(req,res) => {
    const dept = await Dept.findOne({ slug: req.params.deptSlug })
    console.log(dept);
    res.render('article/newSubject', { dept: dept });
    console.log(`User now on ${dept.title}'s New Subject page`)
})
articleRouter.get('/:deptSlug', async(req,res) => {
    const dept = await Dept.findOne({ slug: req.params.deptSlug })
    const subjects = await Subject.find({
        deptSlug: req.params.deptSlug
    }).sort({
        createdAt: 'desc'
    })
    console.log(dept)
    console.log(subjects)

    res.render('article/subjectList', { dept: dept, subjects: subjects });
    console.log(`User now on ${req.params.deptSlug} page..`)
})
articleRouter.get('/:deptSlug/:subjectSlug/newArticle', async(req,res) => {
    const dept = await Dept.findOne({ slug: req.params.deptSlug });
    const subject = await Subject.findOne({ slug: req.params.subjectSlug });
    console.log(subject);
    res.render('article/newArticle', { dept: dept, subject: subject })
    console.log(`User now on ${subject.title}'s New Article Page`);
})
articleRouter.get('/:deptSlug/:subjectSlug', async(req,res) => {
    const dept = await Dept.findOne({ slug: req.params.deptSlug });
    const subject = await Subject.findOne({ slug: req.params.subjectSlug });
    const articles = await Article.find({
        subjectSlug: req.params.subjectSlug
    }).sort({
        createdAt: 'desc'
    })
    console.log('------------------------------------')
    console.log(subject);

    res.render('article/articleList', { dept: dept, subject: subject, articles: articles })
})
articleRouter.get('/:deptSlug/:subjectSlug/:articleSlug', async(req,res) => {
    const dept = await Dept.findOne({ slug: req.params.deptSlug });
    const subject = await Subject.findOne({ slug: req.params.subjectSlug });
    const article = await Article.findOne({ slug: req.params.articleSlug });
    const comments = await Comment.find({ articleSlug: req.params.articleSlug }).sort({ createdAt: 'desc' })

    res.render('article/expanded', {
        dept: dept,
        subject: subject,
        article: article,
        comments: comments
    })
})

//! POST METHOD LIST ----------------------------------------------------------------
//! To make a new department
articleRouter.post('/newDept', async(req,res) => {
    console.log(req.body.deptName)
    let dept = new Dept({
        title: req.body.deptName
    })
    console.log(dept)
    console.log(dept.title)

    try{
        dept = await dept.save()
        res.redirect('/articles')
    } catch(error){
        console.log(error);
        res.redirect('/error')
    }
})

//! To make a new Subject..
articleRouter.post('/:deptSlug/newSubject', async(req,res) => {
    // console.log(req.body.subjectName)
    let subject = new Subject({
        title: req.body.subjectName,
        deptSlug: req.params.deptSlug
    })
    console.log(subject)
    console.log(subject.title)

    try{
        subject = await subject.save()
        res.redirect(`/articles/${req.params.deptSlug}`)
    } catch(error){
        console.log(error);
        res.redirect('/error')
    }
})

//! To make a new Article..
articleRouter.post('/:deptSlug/:subjectSlug/newArticle', async(req,res) => {
    let article = new Article({
        title: req.body.articleTitle,
        username: req.body.articleUserName,
        subjectSlug: req.params.subjectSlug,
        markdown: req.body.articleMarkdown
    })
    console.log(article)

    try{
        article = await article.save()
        res.redirect(`/articles/${req.params.deptSlug}/${req.params.subjectSlug}`)
    } catch(error){
        console.log(error);
        res.redirect('/error')
    }
})

//! TO make a new Comment..
articleRouter.post('/:deptSlug/:subjectSlug/:articleSlug/newComment', async(req,res) => {
    let comment = new Comment({
        username: req.body.articleUserName,
        articleSlug: req.params.articleSlug,
        description: req.body.commentDesc
    })
    console.log(comment)

    try{
        comment = await comment.save()
        res.redirect(`/articles/${req.params.deptSlug}/${req.params.subjectSlug}/${req.params.articleSlug}`)
    } catch(error){
        console.log(error);
        res.redirect('/error')
    }
})

module.exports = articleRouter;