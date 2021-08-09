const mongoose = require('mongoose')
const slugify = require('slugify')

const subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    deptSlug: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

subjectSchema.pre('validate', function(next) {
    if (this.title){
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    next()
})

module.exports = mongoose.model('Subject', subjectSchema);