import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from '../models/UserModel.js'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || 'grei4328hr342ujnijrfei8h3r48hy9wehuiorfjk'
const emailMessage = 'You are getting this mail because you used the Forgot Password method. Your new randomly generated Password is: '

const serverEmailID = ''                                //! Account from which mail is to be sent..
const serverEmailPassword = ''                          //! Password of the same account..
const serverEmailProvider = 'gmail'                     //! Change this if not using gmail account..

//! For sending mails..
var transporter = nodemailer.createTransport({
    service: serverEmailProvider,                           
    auth: {
        user: serverEmailID,
        pass: serverEmailPassword
    }
});
var mailOptions = {
    from: serverEmailID,
    to: '',
    subject: 'Password Reset Email',
    text: ''
};

//! Function to generate a random password of specified length..
function generatePassword(length){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}

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

        if (!oldUser){
            res.status(404).json({ message: 'User not found!' })
            return
        }
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

export const forgotPass = async (req, res) => {
    // console.log(req.body)
    const { email } = req.body

    const oldUser = await User.findOne({ email: email })

    if (oldUser){
        const newPlainPass = generatePassword(12)
        var password = await bcrypt.hash(newPlainPass, 12)
        await User.updateOne(oldUser, {
            $set: { password }
        })
    
        //! Sending the mail..
        mailOptions.text = emailMessage + newPlainPass
        mailOptions.to = oldUser.email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error)
                console.log(error)
            else{
                // console.log(`Email sent: ${info.response}`)
                console.log(`Email sent to: ${email}`)
            }
        })
    
        // console.log(newPlainPass)
    }
    
    res.status(200).json({ message: `If ${email} was registered on the website, a mail containing the new password has been sent to the aforementioned Email ID` })
}