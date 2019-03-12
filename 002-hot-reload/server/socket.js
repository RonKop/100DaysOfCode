const config = require('../config')
const server = require(`${config.path.server}/server`)
const io = require('socket.io')(server)
const watcher = require('node-watch')

io.on('connection', (socket) => {
    console.log('User has joined')

    watcher(config.path.views, { recursive: true }, (evt, name) => {
        socket.emit('refreshHBS')
        console.log('Refreshing .hbs')
    })
    watcher(config.path.assets, { recursive: true }, (evt, name) => {
        const ext = name.split('.').pop()
        if (ext == "css") {
            socket.emit('refreshCSS')
            console.log('Refreshing .css')
        }
        else if (ext == "js") {
            socket.emit('refreshJS')
            console.log('Refreshing .js')
        }
    })
    socket.on('disconnect', () => {
        console.log('User has left')
    })

})



module.exports = io