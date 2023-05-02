import { Router } from 'express'
import { check } from 'express-validator'
import { deleteCategory, getCategories, getCategory, postCategory, putCategory } from '../controllers/categoriesController.js'
import { itemsValidator, validateAdminRole, validateJWT } from '../middlewares/index.js'
import { categoryExistsById } from '../helpers/index.js'

export const categoriesRouter = Router()

categoriesRouter.get('/', validateJWT, getCategories)

categoriesRouter.get(
    '/:id',
    [
        validateJWT,
        check('id', 'El id debe ser un id de mongo').isMongoId(),
        check('id').custom(categoryExistsById),
        itemsValidator
    ],
    getCategory
)

categoriesRouter.post(
    '/',
    [
        validateJWT,
        check('name', 'El name es requerido').not().isEmpty(),
        itemsValidator
    ],
    postCategory
)

categoriesRouter.put(
    '/:id',
    [
        validateJWT,
        check('id', 'El id debe ser un id de mongo').isMongoId(),
        check('name', 'El name es requerido').not().isEmpty(),
        check('id').custom(categoryExistsById),
        itemsValidator
    ],
    putCategory
)

categoriesRouter.delete(
    '/:id',
    [
        validateJWT,
        validateAdminRole,
        check('id', 'El id debe ser un id de mongo').isMongoId(),
        check('id').custom(categoryExistsById),
        itemsValidator
    ],
    deleteCategory
)