import express from 'express'
import cors from 'cors'
import { userRouter } from '../routes/usersRoutes.js'

export class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

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
    }

    listener = () => {
        this.app.listen(this.port, () => {
            console.log(`Server online in port ${this.port}`)
        })
    }
}