import mongoose from 'mongoose';
import slugify from 'slugify'

const deptSchema = mongoose.Schema({
    deptName: {
        type: String,
        required: true,
        unique: true
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

deptSchema.pre('validate', function (next){
    if (this.deptName){
        this.slug = slugify(this.deptName, { lower: true, strict: true })
    }

    next()
})

export default mongoose.model('Dept', deptSchema)