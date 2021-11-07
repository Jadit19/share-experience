import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'

import User from '../../Models/UserModel.js'
import { MAIL_ID, MAIL_PASSWORD, MAIL_PROVIDER } from '../../config.js'

//! Mailing Configuration
const emailMessage = 'You are getting this mail because you used the Forgot Password method. Your new randomly generated Password is: '
const serverEmailID = MAIL_ID                               //! Account from which mail is to be sent..
const serverEmailPassword = MAIL_PASSWORD                   //! Password of the same account..
const serverEmailProvider = MAIL_PROVIDER                   //! Change this if not using gmail account..
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
function generatePassword(length){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}

//! Sign Up (STATUS: OK)
export const register = async (req, res) => {
    try {
        const { firstName, lastName, userName: lCaseUName, email, password: normalPass, profilePic } = req.body
        const userName = lCaseUName.toUpperCase()
        const hashedPassword = await bcrypt.hash(normalPass, 12)
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: hashedPassword,
            profilePic: profilePic
        })
        const savedUser = await newUser.save()
        const { password, createdAt, updatedAt, ...otherInfo } = savedUser._doc
        return res.status(200).json(otherInfo)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}


//! Login (STATUS: OK)
export const login = async (req, res) => {
    try {
        const { email, password: normalPass } = req.body
        const oldUser = await User.findOne({
            email: email
        })
        if (!oldUser){
            return res.status(404).json('Invalid Email / Password combination')
        }

        const validPassword = await bcrypt.compare(normalPass, oldUser.password)
        if (!validPassword){
            return res.status(404).json('Invalid Email / Password combination')
        }

        const { password, createdAt, updatedAt, ...otherInfo } = oldUser._doc
        return res.status(200).json(otherInfo)
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}

//! Reset Password (STATUS: OK)
export const forgotPass = async (req, res) => {
    try {
        const oldUser = await User.findOne({
            email: req.body.email
        })
        if (!oldUser){
            return res.status(404).json("User not found!")
        }

        const newPlainPass = generatePassword(12)
        const password = await bcrypt.hash(newPlainPass, 12)
        await User.updateOne(oldUser, {
            $set: {
                password
            }
        })

        //! Sending the mail..
        mailOptions.text = emailMessage + newPlainPass
        mailOptions.to = oldUser.email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error)
                console.log(error)
            else{
                console.log(`Email sent to: ${email}`)
            }
        })
        
        return res.status(200).json('Password updated successfully!')
    } catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
}