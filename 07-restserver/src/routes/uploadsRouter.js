import { Router } from 'express'
import { check } from 'express-validator'
import { getImage, updateCloudinaryImage, updateImage, uploadFiles } from '../controllers/uploadsController.js'
import { itemsValidator, validateFile } from '../middlewares/index.js'
import { checkCollections } from '../helpers/index.js'

export const uploadsRouter = Router()

uploadsRouter.post('/', uploadFiles)

uploadsRouter.put(
    '/:collection/:id',
    [
        check('id', 'El id debe ser un id de mongo').isMongoId(),
        check('collection', 'La collection debe ser uno de ').custom(x => checkCollections(x, ['users', 'products'])),
        validateFile,
        itemsValidator
    ],
    // updateImage
    updateCloudinaryImage
)

uploadsRouter.get(
    '/:collection/:id',
    [
        check('id', 'El id debe ser un id de mongo').isMongoId(),
        check('collection', 'La collection debe ser uno de ').custom(x => checkCollections(x, ['users', 'products'])),
        itemsValidator
    ],
    getImage
)