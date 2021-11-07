import Article from '../../Models/ArticleModel.js'
import Comment from '../../Models/CommentModel.js'

import { findDept, findSubject, findArticle } from './FindingFunctions.js'

//! Update an Article (STATUS: OK)
export const editArticle = async (req, res) => {
    const { userId, articleId, content } = req.body
    if (content === ''){
        return res.status(400).json('Article content cannot be empty!')
    }
    try {
        const oldArticle = await Article.findById(articleId)
        if (!oldArticle){
            return res.status(404).json('Article not found!')
        }
        if (oldArticle.authorId !== userId){
            return res.status(403).json("You cannot edit this Article!")
        }

        const updatedArticle = await Article.findByIdAndUpdate(oldArticle._id, {
            $set: {
                content: content
            }
        }, {
            timestamps: true
        })
        return res.status(200).json(updatedArticle)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}

//! Update a Comment (STATUS: OK)
export const editComment = async (req, res) => {
    const { userId, commentId, content } = req.body
    if (content === ''){
        return res.status(400).json('Comment content cannot be empty!')
    }
    try {
        const oldComment = await Comment.findById(commentId)
        if (!oldComment){
            return res.status(404).json("Comment not found!")
        }
        if (userId !== oldComment.authorId){
            return res.status(403).json("You cannot edit this Comment!")
        }
        const updatedComment = await Comment.findByIdAndUpdate(commentId, {
            $set: {
                content: content
            }
        }, {
            timestamps: true
        })
        res.status(200).json(updatedComment)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}

//! Like or unlike an article (STATUS: OK)
export const likeArticle = async (req, res) => {
    const { userId, articleId } = req.body
    try  {
        const oldArticle = await Article.findById(articleId)
        if (!oldArticle){
            return res.status(404).json("Article not found!")
        }

        if (oldArticle.likes.includes(userId)){
            await Article.findByIdAndUpdate(articleId, {
                $pull: {
                    likes: userId
                }
            }, {
                timestamps: true
            })
        } else {
            await Article.findByIdAndUpdate(articleId, {
                $push: {
                    likes: userId
                }
            }, {
                timestamps: true
            })
        }
        return res.status(200).json("Article likes updated successfully!")
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}