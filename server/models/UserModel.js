import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
    },
    userName: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profilePic: {
        type: String,
        default: 'no-profile-picture.png'
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.model('User', UserSchema)