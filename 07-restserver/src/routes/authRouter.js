import { Router } from 'express'
import { check } from 'express-validator'
import { login } from '../controllers/authController.js'
import { itemsValidator } from '../middlewares/itemsValidator.js'

export const authRouter = Router()

authRouter.post(
    '/login',
    [
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        itemsValidator
    ],
    login
)