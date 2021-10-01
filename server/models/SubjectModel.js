import mongoose from 'mongoose';
import slugify from 'slugify'

const subjectSchema = mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
        unique: true
    },
    deptSlug: {
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
        unique: true
    }
})

subjectSchema.pre('validate', function(next) {
    if (this.subjectName){
        this.slug = slugify(this.subjectName, { lower: true, strict: true })
    }

    next()
})

export default mongoose.model('Subject', subjectSchema)