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

app.get('/', function(req, res){
  res.render('index');
});

var people = [];
io.sockets.on('connection', function(socket) {
  console.log("connected");
    //people.push(socket);
    //console.log(socket)
    //console.log("we got here")

    socket.on('new_person', function(data){
      console.log("got the new person! " + data);
      people.push(data)
      socket.broadcast.emit('person_sent', data);
      io.emit('person_sent', data);
    });
    socket.on('disconnect', function(data) {
      console.log('Got disconnect!');

      var i = people.indexOf(data);
      people.splice(i, 1);
   });
});


console.log("Listening on port " + JSON.stringify(server['_connectionKey']));