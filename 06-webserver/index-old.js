import http from 'http'

http.createServer((req, res) => {
    // // console.log(req)

    // // res.writeHead(200, { 'Content-Type': 'application/json' })
    // res.setHeader('Content-Disposition', 'attachment; filename=lista.csv')
    // res.writeHead(200, { 'Content-Type': 'application/csv' })

    // // const person = {
    // //     id: 1,
    // //     name: 'Alejandro'
    // // }

    // // res.write(JSON.stringify(person))

    // res.write('id, nombre\n')
    // res.write('1, Fernandoi\n')
    // res.write('2, Maria\n')
    // res.write('3, Juan\n')
    // res.write('4, Pedro\n')

    res.write('Hola Mundo')

    res.end()
}).listen(4000)

console.log('escuchando en el puerto 4000')