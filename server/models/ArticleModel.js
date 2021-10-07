import mongoose from 'mongoose'
import slugify from 'slugify'
import marked from 'marked'
import { JSDOM } from 'jsdom'
import createDomPurify from 'dompurify'

const dompurify = createDomPurify(new JSDOM().window)

const articleSchemma = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
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
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    slug: {
        type: String,
        required: true,
    },
    likes: [String]
})

articleSchemma.pre('validate', function(next) {
    if (this.title){
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    if (this.markdown){
        this.sanitizedHTML = dompurify.sanitize(marked(this.markdown))
    }

    next()
})

export default mongoose.model('Article', articleSchemma)