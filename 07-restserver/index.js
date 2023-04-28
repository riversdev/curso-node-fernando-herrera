import dotenv from 'dotenv'
import { Server } from './src/models/server.js'

dotenv.config()

new Server()