var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var clientsockets=new Array();
app.use(express.static("F://untitled"));
io.on('connection', function(socket){
   clientsockets[socket.handshake.headers.cookie]=socket;
  socket.on('chatmessage', function(msg){
    serversockets?.emit('chatmessage',socket.handshake.headers.cookie+"◇"+msg);
  });
  socket.on('hangyemessage', function(msg){
    serversockets?.emit('hangyemessage',socket.handshake.headers.cookie+"◇"+msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});










var express1 = require('express');
var app1 = express1();
var http1 = require('http').Server(app1);
var io1 = require('socket.io')(http1);
var serversockets;
app1.use(express1.static("D://myjh5"));
io1.on('connection', function(socket){
  serversockets=socket;
  socket.on('chatmessage', function(msg){
    clientsockets[msg.split("◇")[0]]?.emit('chatmessage',msg.split("◇")[1]);
  });
  socket.on('hangyemessage', function(msg){
    clientsockets[msg.split("◇")[0]]?.emit('hangyemessage',msg.split("◇")[1]);
  });
});
http1.listen(3001, function(){
  console.log('listening on *:3001');
});

setInterval(global.gc,60000);