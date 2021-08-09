const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');       //! For image uploads..
const path = require("path");
const fs = require("fs");

const loginRouter = express.Router();
const JWT_SECRET = 'vfew1239bhuei9wgf7866rygtrhtrweuq22wfg23yek324k'

//! For saving uploaded images..
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    // Reject a file..
    if (file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

//! Middleware..
loginRouter.use(express.json());

//! Homepage..
loginRouter.get('/register', async(req,res) => {
    res.render('user/register');
    console.log('User now on Registration page..');
})
loginRouter.get('/login', async(req,res) => {
    res.render('user/login');
    console.log('User now on Login page..');
})
loginRouter.get('/profile', async(req,res) => {
    res.render('user/profile');
    console.log('User now on Profile page..');
})
loginRouter.get('/changePassword', async(req,res) => {
    res.render('user/changePassword');
    console.log('User now on Change Password page..');
})

//! Registration Page..
loginRouter.post('/api/register', upload.single('profilePic'), async(req,res) => {
    console.log(req.body);
    console.log(req.file.path);
    // const { firstname, lastname, email, username, password: plainTextPassword } = req.body;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const username = req.body.username;
    const plainTextPassword = req.body.password;
    const profilePic = req.file.path;
    
    if (!firstname || typeof firstname !== 'string'){
        console.log('User entered invalid First Name..');
        return res.json({ status: 'error', error: 'Invalid First Name' });
    }
    if (!email || typeof email !== 'string'){
        console.log('User entered invalid E-mail Address..');
        return res.json({ status: 'error', error: 'Invalid E-mail Address' });
    }
    if (!username || typeof username !== 'string'){
        console.log('User entered invalid username..');
        return res.json({ status: 'error', error: 'Invalid username' });
    }
    if (!plainTextPassword || typeof plainTextPassword !== 'string'){
        console.log('User entered invalid password');
        return res.json({ status: 'error', error: 'Invalid Password!' });
    }
    if (plainTextPassword.length < 8){
        console.log('User entered too short password')
        return res.json({
            status: 'error',
            error: 'Password too small. Should be atleast 8 characters long.'
        })
    }
    console.log(req.body);

    const password = await bcrypt.hash(plainTextPassword, 10);   //! 10 means 10 times run bcrypt on this password..
    try {
        const response = await User.create({
            firstname,
            lastname,
            email,
            username,
            password,
            profilePic
        })
        console.log(`User Created Successfully!!: ${response}`);
        res.redirect('/user/login');
    } catch (error){
        // console.log(JSON.stringify(error));
        if (error.code === 11000){
            //! Duplicate Username..
            return res.json({ status: 'error', error: 'Username already in use.' });
        }
        throw error;

        // return res.json({ status: 'error' });
    }

    res.json({ status: 'ok' });
})

//! Login(-ed) Page..
loginRouter.post('/api/login', async(req,res) => {

    const { username, password } = req.body;
    const user = await User.findOne({ username }).lean();

    if (!user){
        return res.json({ status: 'error', error: 'Invalid Username/Password' });
    }

    if (await bcrypt.compare(password, user.password)){
        //! The username-password combination is correct..

        const token = jwt.sign({
            id: user._id,
            username: user.username
        },
            JWT_SECRET
        );

        res.json({ status: 'ok', data: token });
    }

    res.json({ status: 'error', error: 'Invalid Username/Password' });
})

//! Now, to change password..
loginRouter.post('/api/changePassword', async(req,res) => {
    const { token, newPassword: plainTextPassword } = req.body;

    if (!plainTextPassword || typeof plainTextPassword !== 'string'){
        console.log('User entered invalid password');
        return res.json({ status: 'error', error: 'Invalid Password!' });
    }
    if (plainTextPassword.length < 8){
        console.log('User entered too short password')
        return res.json({
            status: 'error',
            error: 'Password too small. Should be atleast 8 characters long.'
        })
    }

    try{
        const user = jwt.verify(token, JWT_SECRET);
        console.log('JWT Decoded: ', user);

        const _id = user.id;
        const password = await bcrypt.hash(plainTextPassword, 10);
        await User.updateOne({ _id }, {
            $set: { password }
        })

        res.json({ status: 'ok' });
        // res.redirect('/profile');
    } catch (error){
        console.log(error);
        res.json({ status: 'error', error: ';))' });
    }
})

//! Now personalized profile pages..
loginRouter.post('/api/checkValidity', async(req,res) => {
    const { token } = req.body;

    try{
        const user = jwt.verify(token, JWT_SECRET);
        console.log('JWT Decoded: ', user);

        const username = user.username;
        const person = await User.findOne({ username }).lean();

        res.json({ status: 'ok', user: person });
    } catch (error){
        // console.log('No login detected..');
        // return res.redirect('/error');
        res.json({ status: 'error', error: 'You are being redirected..' })
        // res.redirect('/error');
    }
})

module.exports = loginRouter;