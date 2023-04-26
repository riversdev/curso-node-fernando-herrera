import { Search } from './models/index.js'
import { inquirerMenu, pauseInquirer, readInput, inquireSelectMenu } from './helpers/index.js'

export const ClimaApp = async () => {
    const search = new Search()

    let option = null

    do {
        option = await inquirerMenu()

        switch (option) {
            case 1:
                const name = await readInput('Lugar: ')
                const places = await search.getPlaces(name)
                const placeId = await inquireSelectMenu(places)

                if (!placeId) continue

                const place = places.find(x => x.id === placeId)

                search.addHistory(place.name)

                const weather = await search.getWeatherInfo(place.lat, place.lng)

                console.clear()
                console.log('\nInformacion del lugar\n'.green)
                console.log('Ciudad: ', String(place.name).green)
                console.log('Lat: ', place.lat)
                console.log('Lng: ', place.lng)
                console.log('Temperatura: ', weather.temperature)
                console.log('Minima: ', weather.temperatureMin)
                console.log('Maxima: ', weather.temperatureMax)
                console.log('Estado del clima: ', String(weather.description).green)
                break

            case 2:
                search.history.forEach((name, i) => console.log(`${String(i + 1).green} ${name}`))
                break
        }

        if (option !== 0) await pauseInquirer()
    } while (option !== 0)
}