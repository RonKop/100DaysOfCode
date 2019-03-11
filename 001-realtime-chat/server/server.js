const express = require('express')
const app = express()
const server = require('http').Server(app)
const hbs = require('express-handlebars').create({
    extname: "hbs",
    layoutsDir: `${config.paths.views}/layouts`,
    partialsDir: `${config.paths.views}/partials`
})

app.use(express.static(config.paths.assets))
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.status(200).render(`index`, { layout: "layout" })
})

server.listen(4000, () => {
    console.log('http://localhost:4000')
})

module.exports = server