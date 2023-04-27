import express from 'express'
import dotenv from 'dotenv'
import hbs from 'hbs'

dotenv.config()

const app = express()
const port = process.env.PORT
const { pathname: root } = new URL('./', import.meta.url) // porque estoy usando esmodules, sino seria __dirname
const author = { name: 'Alejandro Rios', title: 'Curso de Node' }


// handlebars
app.set('view engine', 'hbs')
hbs.registerPartials(root + 'views/partials')


// servir contenido estatico
app.use(express.static('public'))


// rutas
app.get('/', (req, res) => {
    res.render('home', author)
})

app.get('/generic', (req, res) => {
    res.render('generic', author)
})

app.get('/elements', (req, res) => {
    res.render('elements', author)
})

app.get('*', (req, res) => {
    res.render('404')
})

// app.get('/saludo', (req, res) => {
//     res.send('pagina de saludo')
// })

// app.get('*', (req, res) => {
//     res.sendFile(root + 'public/404.html')
// })


app.listen(port, () => console.log(`Server online in port ${port}`))