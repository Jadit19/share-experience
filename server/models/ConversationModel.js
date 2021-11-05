import mongoose from 'mongoose'

const ConversationSchema = mongoose.Schema({
    members: {
        type: Array,
        require: true,
        default: []
    }
}, {
    timestamps: true
})

export default mongoose.model('Conversation', ConversationSchema)