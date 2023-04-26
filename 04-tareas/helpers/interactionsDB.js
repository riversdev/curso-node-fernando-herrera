import fs from 'fs'

const fileName = './db/data.json'

export const saveDB = (data) => fs.writeFileSync(fileName, JSON.stringify(data, null, '\t'))

export const readDB = () => {
    if (!fs.existsSync(fileName)) return []

    const data = fs.readFileSync(fileName, { encoding: 'utf-8' })

    return JSON.parse(data)
}