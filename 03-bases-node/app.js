const { argv } = require('./config/yargs')
const { crearArchivo } = require('./helpers/multiplicar')

// lectura de argumentos desde la consola // node app --base=5 --limit=10
// const [, , arg3] = process.argv
// const [, base = 5, limit = 10] = arg3.split('=')


const { base = 1, limit = 10, list = false } = argv

crearArchivo(base, limit, list)
    .then(fileName => console.log(fileName, 'creado'))
    .catch(console.log)