const express = require('express');
const http = require('http');
const Socket = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Socket(server);
const port = process.env.PORT || 7000;

server.listen(port, function(){
  console.log('listening at port %d', port);
})

var rooms = [
  '/foo',
  '/bar'
]

rooms.forEach(room =>{
  io.of(room).on('connection', function (socket){
    console.log('a user has connected to ' + room);
    let addedUser = false;
    socket.broadcast.emit('open')

    socket.on('message', function(data){
      console.log(data);
      socket.broadcast.emit('message', data)
      socket.send(data)
    })
    socket.on('disconnect', function(){
      console.log("a user has disconnected from " + room);
      socket.broadcast.emit('close')

    })
  });
})
