// this was part of working up to SWAPI

const express = require("express");
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/people', function(req, res){
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    axios.get('https://swapi.co/api/people?format=json')
    .then(data => {
        // log the data before moving on!
        if(data.data.next != null) {
            data.data.next = data.data.next.replace("https://swapi.co/api/people/?page=", "")[0];
        }
        if(data.data.previous != null) {
            data.data.previous = data.data.previous.replace("https://swapi.co/api/people/?page=", "")[0];
        }
        // rather than rendering, just send back the json data!
        res.json(data.data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log(error);
        res.json(error);
    })
});
var returnArray = [];

function getData(count){
  return axios.get(`https://swapi.co/api/people?page=${count}&format=json`).then(function(response){
    returnArray = returnArray.concat(response.data);
    return getData(count +1);
  }
  ).catch(function() {
    return returnArray;
  }
)};

app.get('/people/all', function(req,res) {
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    getData(1).then((response) => res.json(response));
});

app.get('/people/:id', function(req,res) {
    // use the axios .get() method - provide a url and chain the .then() and .catch() method
    axios.get('https://swapi.co/api/people?page=' + req.params.id + "&format=json")
    .then(data => {
        // data.data.next = data.data.next.replace("https://swapi.co/api", "");
        // rather than rendering, just send back the json data!
        if(data.data.next != null) {
            data.data.next = data.data.next.replace("https://swapi.co/api/people/?page=", "")[0];
        }
        if(data.data.previous != null) {
            data.data.previous = data.data.previous.replace("https://swapi.co/api/people/?page=", "")[0];
        }
        res.json(data.data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log(error);
        res.json(error);
    });

});
app.get('/planets', function(req, res){
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    axios.get('https://swapi.co/api/planets?format=json')
    .then(data => {
        // log the data before moving on! 
        // rather than rendering, just send back the json data!
        if(data.data.next != null) {
            data.data.next = data.data.next.replace("https://swapi.co/api/planets/?page=", "")[0];
        }
        if(data.data.previous != null) {
            data.data.previous = data.data.previous.replace("https://swapi.co/api/planets/?page=", "")[0];
        }
        res.json(data.data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log('################################################')
        console.log(error);
        res.json(error);
    })
});

var returnPlanetArray = [];

function getPlanetData(count){
  return axios.get(`https://swapi.co/api/planets?page=${count}&format=json`).then(function(response){
    returnPlanetArray = returnPlanetArray.concat(response.data);
    return getPlanetData(count+1);
  }
  ).catch(function() {
    return returnPlanetArray;
  }
)};

app.get('/planets/all', function(req,res) {
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    getPlanetData(1).then((response) => res.json(response));
});

app.get('/planets/:id', function(req,res) {
    // use the axios .get() method - provide a url and chain the .then() and .catch() method

    axios.get('https://swapi.co/api/planets?page=' + req.params.id + "&format=json")
    .then(data => {
        // data.data.next = data.data.next.replace("https://swapi.co/api", "");
        // rather than rendering, just send back the json data!
        if(data.data.next != null) {
            data.data.next = data.data.next.replace("https://swapi.co/api/planets/?page=", "")[0];
        }

        if(data.data.previous != null) {
            data.data.previous = data.data.previous.replace("https://swapi.co/api/planets/?page=", "")[0];
        }
        res.json(data.data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log(error);
        res.json(error);
    });

});

var returnPlanetsArray = [];

function getAllPlanets(count){
  return axios.get(`https://swapi.co/api/planets?page=${count}&format=json`).then(function(response){
    returnPlanetsArray = returnPlanetsArray.concat(response.data);
    return getAllPlanets(count +1);
  }
  ).catch(function() {
    return returnPlanetsArray;
  }
)};

app.get('/planets/all', function(req,res) {
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    getAllPlanets(1);
    res.json(returnPlanetsArray);
});

app.listen(8000, function() {
  console.log("listening on port 8000");
})