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
io.on('connection', socket => {
  socket.on('name_submit', function(data){
    console.log("We got here!")
    console.log(data);
    socket.broadcast.emit('new_name', data);
  });
  //now handle the form!
});


console.log("Listening on port " + JSON.stringify(server['_connectionKey']));