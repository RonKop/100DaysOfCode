const config = require('./config')
const colors = require('colors')
const log = console.log
console.log = (data) => {
    const date = new Date()
    const cd = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds().toString().padStart(2, '0')}`
    log(`${colors.cyan.bold(`[INFO]`)}`, `${colors.dim(cd)} |`, data)
}
const server = require(`${config.path.server}/server`)
if (config.state == "dev") {
    const io = require(`${config.path.server}/socket`)
}