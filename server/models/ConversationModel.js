import mongoose from 'mongoose'

const ConversationSchema = mongoose.Schema({
    memberIds: {
        type: Array,
        require: true,
        default: []
    },
    memberNames: {
        type: Array,
        require: true,
        default: []
    },
    memberProfilePic: {
        type: Array,
        require: true,
        default: []
    }
}, {
    timestamps: true
})

export default mongoose.model('Conversation', ConversationSchema)