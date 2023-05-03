import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { userRouter } from '../routes/usersRouter.js'
import { dbConnection } from '../database/configDB.js'
import { authRouter } from '../routes/authRouter.js'
import { categoriesRouter } from '../routes/categoriesRouter.js'
import { productsRouter } from '../routes/productsRouter.js'
import { searchsRouter } from '../routes/searchsRouter.js'
import { uploadsRouter } from '../routes/uploadsRouter.js'

export class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        dbConnection()

        this.middlewares()
        this.routes()
        this.listener()
    }

    middlewares = () => {
        this.app.use(cors()) // cors
        this.app.use(express.json()) // lectura y parseo del body
        this.app.use(express.static('public')) // directorio publico
        this.app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/', createParentPath: true })) // FileUpload carga de archivos
    }

    routes = () => {
        this.app.use('/api/users', userRouter)
        this.app.use('/api/auth', authRouter)
        this.app.use('/api/categories', categoriesRouter)
        this.app.use('/api/products', productsRouter)
        this.app.use('/api/search', searchsRouter)
        this.app.use('/api/uploads', uploadsRouter)
    }

    listener = () => {
        this.app.listen(this.port, () => {
            console.log(`Server online in port ${this.port}`)
        })
    }
}