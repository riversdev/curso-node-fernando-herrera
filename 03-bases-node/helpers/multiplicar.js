const fs = require('fs')

const crearArchivo = (base = 5, limit = 10, list = false) => new Promise((resolve, reject) => {
    try {
        console.log(`TABLA DEL ${base} ///////////`)

        let salida = ''

        for (let i = 1; i <= limit; i++) {
            salida += `${base} * ${i} = ${base * i}\n`
        }

        if (list) console.log(salida)

        const fileName = `./salida/tabla-${base}.txt`

        fs.writeFileSync(fileName, salida)

        resolve(fileName)
    } catch (error) {
        reject(error)
    }
})

module.exports = {
    crearArchivo
}