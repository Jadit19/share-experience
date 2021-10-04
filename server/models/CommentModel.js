import mongoose from 'mongoose'
import marked from 'marked'
import { JSDOM } from 'jsdom'
import createDomPurify from 'dompurify'

const dompurify = createDomPurify(new JSDOM().window)

const commentSchemma = mongoose.Schema({
    markdown: {
        type: String,
        required: true
    },
    sanitizedHTML: {
        type: String,
        required: true
    },
    subjectSlug: {
        type: String,
        required: true
    },
    deptSlug: {
        type: String,
        required: true
    },
    articleSlug: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

commentSchemma.pre('validate', function(next) {
    if (this.markdown){
        this.sanitizedHTML = dompurify.sanitize(marked(this.markdown))
    }

    next()
})

export default mongoose.model('Comment', commentSchemma)