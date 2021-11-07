import mongoose from 'mongoose'

const MessageSchema = mongoose.Schema({
    conversationId: {
        type: String,
        require: true
    },
    sender: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Message', MessageSchema)