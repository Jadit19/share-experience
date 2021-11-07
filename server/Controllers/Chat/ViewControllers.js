import User from '../../Models/UserModel.js'
import Conversation from '../../Models/ConversationModel.js'
import Message from '../../Models/MessageModel.js'

//! View Conversation, Single User (STATUS: OK)
export const getConversation = async (req, res) => {
    const { userId } = req.params
    try {
        const oldUser = await User.findById(userId)
        if (!oldUser){
            return res.status(404).json('User not found!')
        }

        const oldConvs = await Conversation.find({
            memberNames: {
                $in: [oldUser.userName]
            }
        }).sort({
            updatedAt: 'desc'
        })
        return res.status(200).json(oldConvs)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}

//! Get Messages (STATUS: NOT OK)
export const getMessages = async (req, res) => {
    const { convId, userId } = req.params
    try {
        const oldConv = await Conversation.findById(convId)
        if (!oldConv){
            return res.status(404).json('Conversation not found!')
        } else if (!oldConv.memberIds.includes(userId)){
            return res.status(403).json("You are not allowed to view these messages")
        }

        const oldMessages = await Message.find({
            conversationId: convId
        }).sort({
            createdAt: 'asc'
        })
        return res.status(200).json(oldMessages)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}