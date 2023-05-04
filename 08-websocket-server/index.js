import dotenv from 'dotenv'
import { WebSocketServer } from './src/WebSocketServer.js'

dotenv.config()

new WebSocketServer()