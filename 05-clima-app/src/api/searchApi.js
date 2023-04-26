import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

export const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        access_token: process.env.MAPBOX_KEY,
        language: 'es'
    }
})