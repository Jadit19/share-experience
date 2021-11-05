import express from 'express'
import { register, login, forgotPass } from '../../Controllers/User/AuthControllers.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/forgotPass', forgotPass)

export default router