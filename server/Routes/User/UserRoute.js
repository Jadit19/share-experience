import express from 'express'
import { updateUser, deleteUser, getUser } from '../../Controllers/User/UserControllers.js'

const router = express.Router()

router.get('/profile/:userName', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router