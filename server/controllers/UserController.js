import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/UserModel.js'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || 'grei4328hr342ujnijrfei8h3r48hy9wehuiorfjk'

export const signUp = async (req, res) => {
    // console.log(req.body)

    const { firstName, lastName, email, password, profilePic } = req.body
    const hashedPass = await bcrypt.hash(password, 12)

    try {
        const newUser = await User({
            firstName,
            lastName,
            email,
            password: hashedPass,
            profilePic
        })
        // console.log(newUser)
        newUser.save()

        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    // console.log(req.body)

    const { email, password } = req.body
    
    try {
        const oldUser = await User.findOne({ email: email }).lean()
        // console.log(oldUser)
        
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
        if (!isPasswordCorrect){
            return res.status(400).json({ message: 'Invalid Credentials' })
        }

        const token = jwt.sign({
            email: oldUser.email,
            id: oldUser._id
        }, JWT_SECRET, {
            expiresIn: '1h'
        })

        res.status(200).json({ result: oldUser, token })

    } catch (error) {
        console.log(error)
        res.status(404)
    }
}

export const changePass = async (req, res) => {
    // console.log(req.body)
    const { email, password: plainPass } = req.body

    try {
        const oldUser = await User.findOne({ email: email })
        if (!oldUser){
            res.status(404).json({ message: 'User not found!' })
            return
        }

        if (plainPass === ''){
            res.status(401).json({ message: 'Password cannot be empty!' })
            return
        }

        const password = await bcrypt.hash(plainPass, 12)
        await User.updateOne({ email: email }, {
            $set: { password }
        })

        res.status(200).json({ message: 'Password Updated Successfully!' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Something went wrong!' })
    }
}