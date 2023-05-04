import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { messagesController } from './sockets/messagesController.js'

export class WebSocketServer {
    constructor() {
        this.port = process.env.PORT

        this.app = express()
        this.server = createServer(this.app)
        this.io = new Server(this.server)

        this.middlewares()
        this.routes()
        this.sockets()
        this.listener()
    }

    middlewares = () => {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes = () => { }

    sockets = () => {
        this.io.on('connection', messagesController)
    }

    listener = () => {
        this.server.listen(this.port, () => {
            console.log(`Server online in port ${this.port}`)
        })
    }
}