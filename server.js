var net = require('net');

var HOST = '192.168.1.10';
var PORT = 55555;

var client = new net.Socket();

var global_data = "";

client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    client.write('hogehoge');

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    
    console.log('DATA: ' + data);
	global_data = data;
    // Close the client socket completely
    //client.destroy();
    
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});

// ---------------------------------------------------

var express = require('express');
var app = express();

app.get('/', function(req, res){
  console.log(req.url);
  res.sendFile(__dirname + '/index.html');
});

app.get('/js/*', function(req, res){
  console.log(req.url);
  res.sendFile(__dirname + req.url);
});

app.get('/node_modules/*', function(req, res){
  console.log(req.url);
  res.sendFile(__dirname + req.url);
});

app.get('/bower_components/*', function(req, res){
  console.log(req.url);
  res.sendFile(__dirname + req.url);
});

app.get('/renew', function(req, res) {
  console.log(global_data);
  res.send(global_data);
});

app.listen(8888);
