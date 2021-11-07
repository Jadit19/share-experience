import User from '../../Models/UserModel.js'

export const findUser = async (userName) => {
    const oldUser = await User.findOne({
        userName: userName
    })
    return oldUser
}