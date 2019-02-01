// this was part of working up to SWAPI

var express = require("express");
var app = express();
const axios = require('axios');
app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get('/', function(request, response){
  response.render('index');
});


app.listen(8000, function() {
  console.log("listening on port 8000");
})