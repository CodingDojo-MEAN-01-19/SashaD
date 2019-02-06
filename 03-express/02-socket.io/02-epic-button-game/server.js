var express = require("express");
var app = express();
var parser = require('body-parser');
const server = app.listen(1999);
const io = require('socket.io')(server);
const path = require('path');


app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index');
});
//on is method to listen for event
var count = 0;
io.on('connection', socket => {
  socket.on('epic', function(data){
    console.log("We got here!")
    count += 1;
    console.log(count);
    io.emit('epic_update', {epic_val: count});
  });
  //now handle the form!
  socket.on('empty', function(data){
    let count = 0;
    console.log(count);
    io.emit('epic_update', {epic_val: count});
  });
});

console.log("Listening on port " + JSON.stringify(server['_connectionKey']));