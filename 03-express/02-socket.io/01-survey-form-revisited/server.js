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
let count = 0;
io.on('connection', socket => {
  socket.on('submit', function(){
    let random_number = Math.floor((Math.random() * 1000) + 1);
    io.emit('newRandomNum', random_number);
  });
  //now handle the form!
  socket.on('posting_form', function(data){
    console.log(data);
    io.emit('formSent', data);
  });
});

console.log("Listening on port " + JSON.stringify(server['_connectionKey']));
