var express = require("express");
var app = express();
var parser = require('body-parser');
var session = require('express-session');
const server = app.listen(1999);
const io = require('socket.io')(server);
const path = require('path');


app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.set(session({
  secret: 'ThisIsASecret',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}));

let all_messages = [];
var users = [];

app.get('/', function(req, res){
  res.render('index');
});

io.on('connection', function(socket){
  socket.on('login', function(data){
    console.log(data);
    users.push(data);
    console.log(data.person);
    let current_person = data.person;
    socket.emit('current_person', {current_person: current_person});
    socket.emit('init_board', {all_messages: all_messages});
    socket.on('send', function(data){
      console.log(data.msg);
      console.log(current_person);
      all_messages.push(current_person + ": " + data.msg)
      io.emit('msg_update', {msg: current_person + ": " + data.msg});
    });
    socket.on('disconnect', function (person){  
      var pos = users.indexOf(person);
      if (pos >= 0){
        users.splice(pos, 1);
      };
    });
  });
});

console.log("Listening on port " + JSON.stringify(server['_connectionKey']))