import Conversation from '../../Models/ConversationModel.js'
import Message from '../../Models/MessageModel.js'
import { findUser } from '../User/userExportController.js'

//! New Conversation (STATUS: OK)
export const newConversation = async (req, res) => {
    const { firstUserName, secondUserName:sName } = req.body
    const secondUserName = sName.toUpperCase()
    if (firstUserName === secondUserName){
        return res.status(403).json('You cannot have a conversation with yourself!')
    }
    try {
        const firstUser = await findUser(firstUserName)
        const secondUser = await findUser(secondUserName)
        if (!firstUser || !secondUser){
            return res.status(404).json('User not found!')
        }

        const oldConv1 = await Conversation.findOne({
            memberIds: [firstUser._id, secondUser._id]
        })
        const oldConv2 = await Conversation.findOne({
            memberIds: [secondUser._id, firstUser._id]
        })
        if (oldConv1 || oldConv2){
            console.log(oldConv1)
            console.log(oldConv2)
            return res.status(400).json('Conversation already exists!')
        }

        const newConversation = new Conversation({
            memberIds: [firstUser._id, secondUser._id],
            memberNames: [firstUserName, secondUserName],
            memberProfilePic: [firstUser.profilePic, secondUser.profilePic]
        })
        const savedConversation = await newConversation.save()
        return res.status(200).json(savedConversation)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}

//! New Message (STATUS: NOT OK)
export const newMessage = async (req, res) => {
    const { conversationId, content, senderId } = req.body
    try {
        const oldConv = await Conversation.findById(conversationId)
        if (!oldConv){
            return res.status(404).json('Conversation not found!')
        }
        if (!oldConv.memberIds.includes(senderId)){
            return res.status(403).json('You are not allowed to send messages in this conversation!')
        }

        const newMessage = new Message({
            conversationId: conversationId,
            sender: senderId,
            text: content
        })
        const savedMessage = await newMessage.save()
        return res.status(200).json(savedMessage)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}