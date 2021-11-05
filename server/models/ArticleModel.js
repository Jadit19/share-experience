import mongoose from 'mongoose'
import slugify from 'slugify'

const ArticleSchema = mongoose.Schema({
    articleName: {
        type: String,
        require: true,
        unique: true
    },
    content: {
        type: String,
        require: true
    },
    authorName: {
        type: String,
        require: true
    },
    authorId: {
        type: String,
        require: true
    },
    likes: {
        type: Array,
        default: []
    },
    articleSlug: {
        type: String,
        require: true,
        unique: true
    },
    subjectSlug: {
        type: String,
        require: true
    },
    deptSlug: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

ArticleSchema.pre('validate', function (next){
    if (this.articleName){
        this.articleSlug = slugify(this.articleName, {
            lower: true,
            unique: true
        })
    }

    next()
})

export default mongoose.model('Article', ArticleSchema)