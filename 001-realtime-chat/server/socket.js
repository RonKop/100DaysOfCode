const server = require(`${config.paths.server}/server`)
const io = require('socket.io')(server)
let users = []
let messages = []

io.on('connection', (socket) => {
    socket.on('userConnect', (data) => {
        socket.user = data
        users.push(socket.user)
        io.emit('returnMessages', messages)
    })
    socket.on('disconnect', () => {
        users = users.filter(users => users != socket.user)
    })
    socket.on('sendMessage', (message) => {
        messages.push({ user: socket.user.name, message, date: +Date.now() })
        io.emit('returnMessages', messages)
    })
})

module.exports = io





















