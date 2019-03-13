const express = require('express')
const app = express()
const watcher = require('node-watch')
const public = process.cwd() + "/public"
const fs = require('fs')

watcher(`${public}/index.html`, (evt, name) => {
    fs.copyFileSync(`${public}/index.html`, `${public}/index.hbs`)
})

app.use(express.static(public))

app.get('/', (req, res) => {
    res.sendFile(`${public}/index.html`)
})

app.get('/css', (req, res) => {
    res.sendFile(`${public}/assets/css/main.css`)
})

app.get('/html', (req, res) => {
    res.sendFile(`${public}/index.hbs`)
})

app.listen(process.argv[2] || 4000, () => {
    console.log(`Server running on http://localhost:4000/`)
})