import mongoose from 'mongoose'

const CommentSchema = mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    authorName: {
        type: String,
        require: true
    },
    authorId:{
        type: String,
        require: true
    },
    articleId: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Comment', CommentSchema)