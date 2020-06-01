const path = require('path');
const http = require('http');
var express = require("express");
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'/../public');
const port = process.env.PORT || 3000;
var app = express();
let server = http.createServer(app);
let io = socketIO(server)
console.log(io)
app.use(express.static(publicPath));

io.on('connection',(socket) => {
    console.log(`A new user just connected`)
    socket.on('disconnect',() => {
        console.log(`A user just diconnected`)
    })
})

server.listen(port, ()=>{
    console.log(`Server is running on port = ${port}`)
})