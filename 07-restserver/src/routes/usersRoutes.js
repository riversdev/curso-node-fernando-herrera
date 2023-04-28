import { Router } from 'express'
import { deleteUser, getUsers, getUser, postUser, putUser } from '../controllers/usersController.js'

export const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.post('/:id', postUser)
userRouter.put('/:id', putUser)
userRouter.delete('/:id', deleteUser)