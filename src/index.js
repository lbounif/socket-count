const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
//create server and pass express to it
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0

io.on('connection', (socket)=> {
    console.log('New websocket connexion')
    //1. send message from server to client 
    socket.emit('countUpdated', count)
    socket.on('increment', () => {
        count ++
        //update count in client (particular connection)
        //socket.emit('countUpdated', count)

        //update count in client (all connections)
        io.emit('countUpdated', count)

    })
})
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})