var express = require("express");
const path = require('path');
var session = require('express-session');
var parser = require('body-parser');
const io = require('socket.io'),
  connect = require('connect');

var app = express().connect().use(connect.static('public')).listen(3000);


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
      users.push = data.person;
      console.log(data.person);
      socket.emit('init_board', {all_messages: all_messages});
      socket.once('disconnect', function (){
        var pos = users.indexOf(name);
        if (pos >= 0){
          users.splice(pos, 1);
        };
      });
      socket.on('send', function(data){
        console.log(data.msg)
        all_messages.push(session.person + ": " + data.msg)
        io.emit('msg_update', {msg: session.username + ": " + data.msg});
    });
  });

  
});

console.log("Listening on port " + JSON.stringify(server['_connectionKey']))