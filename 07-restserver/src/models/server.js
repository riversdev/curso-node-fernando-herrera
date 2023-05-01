import express from 'express'
import cors from 'cors'
import { userRouter } from '../routes/usersRouter.js'
import { dbConnection } from '../database/configDB.js'
import { authRouter } from '../routes/authRouter.js'

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
    }

    routes = () => {
        this.app.use('/api/users', userRouter)
        this.app.use('/api/auth', authRouter)
    }

    listener = () => {
        this.app.listen(this.port, () => {
            console.log(`Server online in port ${this.port}`)
        })
    }
}