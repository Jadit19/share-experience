import Article from '../../Models/ArticleModel.js'
import Comment from '../../Models/CommentModel.js'

import { findDept, findSubject, findArticle } from './FindingFunctions.js'


//! Delete an Article (STATUS: OK)
export const deleteArticle = async (req, res) => {
    let i=0
    const { userId, articleId } = req.params
    try {
        const oldArticle = await Article.findById(articleId)
        if (!oldArticle){
            return res.status(404).json('Article not found!')
        }
        if (oldArticle.authorId !== userId){
            return res.status(403).json("You cannot delete this Article!")
        }

        const allComments = await Comment.find({
            articleId: articleId
        })

        await Article.findByIdAndDelete(oldArticle._id)
        for (i=0; i<allComments.length; i++){
            await Comment.findByIdAndDelete(allComments[i]._id)
        }
        return res.status(200).json('Article removed successfully!')
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}

//! Delete a Comment (STATUS: OK)
export const deleteComment = async (req, res) => {
    const { userId, commentId } = req.params
    try {
        const oldComment = await Comment.findById(commentId)
        if (!oldComment){
            return res.status(404).json("Comment not found!")
        }
        if (userId !== oldComment.authorId){
            return res.status(403).json("You cannot edit this Comment!")
        }

        await Comment.findByIdAndDelete(oldComment._id)
        return res.status(200).json("Comment deleted successfully!")
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}