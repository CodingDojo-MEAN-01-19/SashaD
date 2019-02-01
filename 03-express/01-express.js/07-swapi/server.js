// this was part of working up to SWAPI

var express = require("express");
var app = express();

const axios = require('axios');
app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/people', function(req, res){
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    axios.get('http://swapi.co/api/people')
    .then(data => {
        // log the data before moving on!
        for(i in data){
            console.log(data[i].results.name);
        } 
        // rather than rendering, just send back the json data!
        res.json(data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log(error);
        res.json(error);
    })
});
app.get('/planets', function(req, res){
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    axios.get('http://swapi.co/api/planets')
    .then(data => {
        // log the data before moving on! 
        console.log('###################################')
        console.log(data[results]);
        console.log('###################################')
        // rather than rendering, just send back the json data!
        res.json(data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log('################################################')
        console.log(error);
        res.json(error);
    })
});

app.listen(8000, function() {
  console.log("listening on port 8000");
})