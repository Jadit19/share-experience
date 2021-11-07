import mongoose from 'mongoose'
import slugify from 'slugify'

const SubjectSchema = mongoose.Schema({
    subjectName: {
        type: String,
        require: true,
        unique: true
    },
    subjectSlug: {
        type: String,
        require: true,
        unique: true
    },
    deptSlug: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

SubjectSchema.pre('validate', function (next){
    if (this.subjectName){
        this.subjectSlug = slugify(this.subjectName, {
            lower: true,
            strict: true
        })
    }

    next()
})

export default mongoose.model('Subject', SubjectSchema)