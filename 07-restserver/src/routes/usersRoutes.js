import { Router } from 'express'
import { check } from 'express-validator'
import { deleteUser, getUsers, getUser, postUser, putUser } from '../controllers/usersController.js'
import { itemsValidator } from '../middlewares/itemsValidator.js'
import { emailExists, roleExists, userExistsById } from '../helpers/dbValidators.js'

export const userRouter = Router()

userRouter.get('/', getUsers)

userRouter.get(
    '/:id',
    [
        check('id', 'El id debe ser un id de mongo').isMongoId(),
        check('id').custom(userExistsById),
        itemsValidator
    ],
    getUser
)

userRouter.post(
    '/',
    [
        check('name', 'El name es obligatorio').not().isEmpty(),
        // check('email', 'El email no es valido').isEmail(),
        check('password', 'El password es obligatorio y de mas de 6 caracteres').not().isEmpty().isLength({ min: 6 }),
        // check('role', 'El role debe ser ADMIN_ROLE o USER_ROLE').isIn(['ADMIN_ROLE', 'USER_ROLE']),

        // customs
        check('email').custom(emailExists),
        check('role').custom(roleExists),

        itemsValidator
    ],
    postUser
)

userRouter.put(
    '/:id',
    [
        check('id', 'El id debe ser un id de mongo').isMongoId(),
        check('id').custom(userExistsById),
        check('role').custom(roleExists),
        itemsValidator
    ],
    putUser
)

userRouter.delete(
    '/:id',
    [
        check('id', 'El id debe ser un id de mongo').isMongoId(),
        check('id').custom(userExistsById),
        itemsValidator
    ],
    deleteUser
)