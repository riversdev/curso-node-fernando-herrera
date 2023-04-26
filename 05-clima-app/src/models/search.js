import fs from 'fs'
import { searchApi, weatherApi } from '../api/index.js'

export class Search {
    dbPath = './src/db/db.json'
    history = []

    constructor() {
        this.readDB()
    }

    getPlaces = async (name = '') => {
        try {
            const { data: { features } } = await searchApi.get(`/${name}.json`)

            return features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1],
            }))
        } catch (error) {
            console.log(error)
            return []
        }
    }

    getWeatherInfo = async (lat, lon) => {
        try {
            const { data } = await weatherApi.get('', { params: { lat, lon } })
            const { weather, main } = data

            return {
                description: weather[0].description,
                temperature: main.temp,
                temperatureMin: main.temp_min,
                temperatureMax: main.temp_max,
            }
        } catch (error) {
            console.log(error)
            return {}
        }
    }

    addHistory = (name = '') => {
        if (this.history.includes(name.toLowerCase())) return

        this.history.unshift(name.toLowerCase())

        this.history = this.history.splice(0, 5)

        this.saveDB()
    }

    saveDB = () => {
        const payload = { history: this.history }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload, null, '\t'))
    }

    readDB = () => {
        if (!fs.existsSync(this.dbPath)) return

        const content = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
        const db = JSON.parse(content)

        this.history = db.history
    }
}