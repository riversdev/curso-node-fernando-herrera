import { Router } from 'express'
import { searchController } from '../controllers/searchsController.js'
import { validateJWT } from '../middlewares/index.js'

export const searchsRouter = Router()

searchsRouter.get(
    '/:collection/:term',
    [
        validateJWT
    ],
    searchController
)