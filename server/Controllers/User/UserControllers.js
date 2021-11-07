import bcrypt from 'bcryptjs'

import User from '../../Models/UserModel.js'
import Article from '../../Models/ArticleModel.js'
import Conversation from '../../Models/ConversationModel.js'
import Message from '../../Models/MessageModel.js'

//! Update User (STATUS: OK)
export const updateUser = async (req, res) => {
    if (req.body.userId===req.params.id || req.body.isAdmin){
        if (req.body.password !== ''){
            try {
                req.body.password = await bcrypt.hash(req.body.password, 12)
            } catch (error){
                console.log(error)
                return res.status(500).json(error)
            }
        }
        
        try {
            const oldUser = await User.findById(req.params.id)
            if (!oldUser){
                return res.status(404).json('Cannot find user')
            }
            
            let updatedUser = oldUser
            const { firstName, lastName, password, profilePic } = req.body
            if (firstName !== oldUser.firstName){
                updatedUser = await User.findByIdAndUpdate(oldUser._id, {
                    $set: { firstName }
                }, {
                    timestamps: true
                })
            }
            if (lastName !== oldUser.lastName){
                updatedUser = await User.findByIdAndUpdate(oldUser._id, {
                    $set: { lastName }
                }, {
                    timestamps: true
                })
            }
            if (profilePic !== oldUser.profilePic){
                updatedUser = await User.findByIdAndUpdate(oldUser._id, {
                    $set: { profilePic }
                }, {
                    timestamps: true
                })
            }
            if (password !== ''){
                updatedUser = await User.findByIdAndUpdate(oldUser._id, {
                    $set: { password }
                }, {
                    timestamps: true
                })
            }
            return res.status(200).json(updatedUser)
        } catch (error){
            console.log(error)
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json("You can update your account only!")
    }
}

//! Delete User (STATUS: OK)
export const deleteUser = async (req, res) => {
    try {
        const oldUser = await User.findById(req.params.id)
        if (!oldUser){
            return res.status(404).json("User not found!")
        }

        let i=0, j=0
        const oldConvs = await Conversation.find({
            memberNames: {
                $in: [oldUser.userName]
            }
        })
        for (i=0; i<oldConvs.length; i++){
            const oldMessages = await Message.find({
                conversationId: oldConvs[i]._id
            })
            for (j=0; j<oldMessages.length; j++){
                await Message.findByIdAndDelete(oldMessages[j]._id)
            }
            await Conversation.findByIdAndDelete(oldConvs[i]._id)
        }
        await User.findByIdAndDelete(oldUser._id)

        res.status(200).json("Account has been deleted successfully!")
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}

//! View User (STATUS: OK)
export const getUser = async (req, res) => {
    const { userId } = req.body
    const userName = req.params.userName
    try {
        const oldUser = await User.findOne({
            userName: userName
        })
        if (!oldUser){
            return res.status(404).json("User not found!")
        }

        const oldArticles = await Article.find({
            authorId: oldUser._id
        })

        const { password, createdAt, updatedAt, ...otherInfo } = oldUser._doc
        if (oldUser._id === userId){
            return res.status(200).json({ user: otherInfo, contri: oldArticles.length })
        } else {
            const { email, ...withoutEmail } = otherInfo
            return res.status(200).json({ user: withoutEmail, contri: oldArticles.length })
        }
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}