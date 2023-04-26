import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

export const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
    params: {
        appid: process.env.OPENWEATHERMAP_KEY,
        units: 'metric',
        lang: 'es'
    }
})