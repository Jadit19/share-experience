import mongoose from 'mongoose'
import slugify from 'slugify'

const DeptSchema = mongoose.Schema({
    deptName: {
        type: String,
        require: true,
        unique: true
    },
    deptSlug: {
        type: String,
        require: true,
        unique: true
    }
}, {
    timestamps: true
})

DeptSchema.pre('validate', function (next){
    if (this.deptName){
        this.deptSlug = slugify(this.deptName, {
            lower: true,
            strict: true
        })
    }

    next()
})

export default mongoose.model('Dept', DeptSchema)