import express from 'express'
// import User from '../models/UserModel.js'

import { signUp, login, changePass } from '../controllers/UserController.js'
const router = express.Router()

//! STATUS: OK
router.post('/signUp', signUp)

//! STATUS: OK
router.post('/login', login)

//! STATUS: OK
router.post('/changePassword', changePass)

//! FOR DEBUGGING..
// router.get('/', async (req, res) => {
//     const allUsers = await User.find()
//     res.json(allUsers)
// })

export default router