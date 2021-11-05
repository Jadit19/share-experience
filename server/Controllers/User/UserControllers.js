import bcrypt from 'bcryptjs'
import User from '../../Models/UserModel.js'

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
                })
            }
            if (lastName !== oldUser.lastName){
                updatedUser = await User.findByIdAndUpdate(oldUser._id, {
                    $set: { lastName }
                })
            }
            if (profilePic !== oldUser.profilePic){
                updatedUser = await User.findByIdAndUpdate(oldUser._id, {
                    $set: { profilePic }
                })
            }
            if (password !== ''){
                updatedUser = await User.findByIdAndUpdate(oldUser._id, {
                    $set: { password }
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
    if (req.body.userId===req.params.id){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account has been deleted successfully!")
        } catch (error){
            console.log(error)
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json('You can delete your account only!')
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

        const { password, createdAt, updatedAt, ...otherInfo } = oldUser._doc
        if (oldUser._id === userId){
            return res.status(200).json(otherInfo)
        } else {
            const { email, ...withoutEmail } = otherInfo
            return res.status(200).json(withoutEmail)
        }
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}