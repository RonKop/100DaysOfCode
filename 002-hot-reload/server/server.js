const config = require('../config')
const express = require('express')
const app = express()
const hbs = require('express-handlebars').create({
    layoutsDir: `${config.path.views}/layouts`,
    partialsDir: `${config.path.views}/partials`,
    extname: "hbs",
    defaultLayout: "index"
})
const server = require('http').Server(app)

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.use(express.static(`public`))
app.set('dev', config.state == "dev" ? true : false)

app.get('/', (req, res) => {
    res.render('home', { dev: app.get('dev') })
})
server.listen(4000, () => {
    console.log('Listening on http://localhost:4000')
})

module.exports = server