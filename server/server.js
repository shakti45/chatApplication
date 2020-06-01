const path = require('path');
const http = require('http');
var express = require("express");
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'/../public')
const port = process.env.PORT || 3000
var app = express()
let server = http.createServer(app)
let io = socketIO(server)
console.log(io)
app.use(express.static(publicPath))

io.on('connection',(socket) => {
    console.log(`A new user just connected`)
    socket.emit('newMessage', {
        from : 'admin',
        text : 'Welcome to the chat room',
        createdAt : new Date().getTime()
    })
    socket.broadcast.emit('newMessage',{
        from : 'admin',
        text : 'New User joined',
        createdAt : new Date().getTime()
    })
    socket.on(`createMessage`, (message) => {
        console.log(`createMessage`, message)
        io.emit('newMessage', {
            from: message.from,
            text : message.text,
            createdAt: new Date().getTime()
        })
    })
    socket.on('disconnect',() => {
        console.log(`A user just diconnected`)
    })
})

server.listen(port, ()=>{
    console.log(`Server is running on port = ${port}`)
})