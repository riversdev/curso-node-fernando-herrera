import { Router } from 'express'
import { check } from 'express-validator'
import { itemsValidator, validateAdminRole, validateJWT } from '../middlewares/index.js'
import { deleteProduct, getProduct, getProducts, postProduct, putProduct } from '../controllers/productsController.js'
import { categoryExistsById, productExistsById } from '../helpers/index.js'

export const productsRouter = Router()

productsRouter.get('/', validateJWT, getProducts)

productsRouter.get(
    '/:id',
    [
        validateJWT,
        check('id', 'El id debe ser un id de mongo').isMongoId(),
        check('id').custom(productExistsById),
        itemsValidator
    ],
    getProduct
)

productsRouter.post(
    '/',
    [
        validateJWT,
        check('name', 'El name es requerido').notEmpty().isString(),
        check('category', 'El category debe ser un id de mongo').isMongoId().custom(categoryExistsById),
        check('description', 'El descripction es requerido').notEmpty().isString(),
        itemsValidator
    ],
    postProduct
)

productsRouter.put(
    '/:id',
    [
        validateJWT,
        check('id', 'El id debe ser un id de mongo').isMongoId(),
        check('id').custom(productExistsById),
        check('name', 'El name es requerido').notEmpty().isString(),
        check('category', 'El category debe ser un id de mongo').isMongoId().custom(categoryExistsById),
        check('description', 'El descripction es requerido').notEmpty().isString(),
        itemsValidator
    ],
    putProduct
)

productsRouter.delete(
    '/:id',
    [
        validateJWT,
        validateAdminRole,
        check('id', 'El id debe ser un id de mongo').isMongoId(),
        check('id').custom(productExistsById),
        itemsValidator
    ],
    deleteProduct
)