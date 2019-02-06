// this was part of working up to SWAPI
const session = require('express-session');
const express = require("express");
const axios = require('axios');
const parser = require('body-parser');
const path = require('path');

const app = express();

const sessionConfig = {
    secret: 'ThisIsASecret',
    resave: false,
    name: 'session',
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
};

app.use(session(sessionConfig));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(express.static(path.join(__dirname, 'static')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/people', (req, res) => {
    // use the axios .get() method - 
    // provide a url and chain the .then() and .catch() methods
    //  axios.get(swapiPeopleUrl)
    axios.get('https://swapi.co/api/people?format=json')
    .then(data => {
        // log the data before moving on! 
        //console.log("got the data: ", data.data);
        req.session.next = data.data.next;
        req.session.previous = data.data.previous;
        req.session.count = data.data.count;
        req.session.category = '/people/';
        //  res.send(data.data);
        // rather than rendering, just send back the json data!
        res.json(data.data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log('The following errors were generated: ', error);
        res.json(error);
    })
});

app.get('/planets', (req, res) =>{
    // use the axios .get() method - 
    // provide a url and chain the .then() and .catch() methods
    axios.get('https://swapi.co/api/planets?format=json')
    .then(data => {
        // log the data before moving on!
        //console.log("got the data: ", data.data);
        req.session.next = data.data.next;
        req.session.previous = data.data.previous;
        req.session.count = data.data.count
        req.session.category = '/planets/'
        // res.send(data.data);
        // rather than rendering, just send back the json data!
        res.json(data.data);
    })
    .catch(error => {
         // log the error before moving on!
        console.log('The following errors were generated: ', error);
        res.json(error);
    })
});

app.get('/next', (req, res) => {
    axios.get(req.session.next)
    .then(data => {
        // log the data before moving on!
        //console.log("got the data: ", data.data);
        req.session.next = data.data.next;
        req.session.previous = data.data.previous;
        // res.send(data.data);
        // rather than rendering, just send back the json data!
        res.json(data.data);
    })
    .catch(error => {
         // log the error before moving on!
        console.log('The following errors were generated: ', error);
        res.json(error);
    })
});

app.get('/prev', (req, res) => {
    axios.get(req.session.previous)
    .then(data => {
        // log the data before moving on!
        //console.log("got the data: ", data.data);
        req.session.next = data.data.next;
        req.session.previous = data.data.previous;
        // res.send(data.data);
        // rather than rendering, just send back the json data!
        res.json(data.data);
    })
    .catch(error => {
         // log the error before moving on!
        console.log('The following errors were generated: ', error);
        res.json(error);
    })
});

app.get('/all', (req, res) => {
    let allData = [];
    for(let i = 1; i <= req.session.count + 1; i++){
        if (req.session.category == '/people/'){
            if( i != 17) {
                axios.get('https://swapi.co/api' + req.session.category + i + '/?format=json')
                .then(data => {
                    // log the data before moving on!
                    //console.log("got the data: ", data.data);
                    //console.log(data.data.name);
                    allData.push(data.data.name);
                    if(i === req.session.count){
                        //console.log(allData);
                        res.json(allData);
                    }
                    // console.log('First then', allData);
                    // res.send(data.data);
                    // rather than rendering, just send back the json data!
                })
                .catch(error => {
                    // log the error before moving on!
                    console.log('The following errors were generated: ', error.message);
                    res.json(error);
                })
            }
        }
        else{
            if( i != 62) {
                axios.get('https://swapi.co/api' + req.session.category + i + '/?format=json')
                .then(data => {
                    // log the data before moving on!
                    //console.log("got the data: ", data.data);
                    //console.log(data.data.name);
                    allData.push(data.data.name);
                    if(i === req.session.count){
                        //console.log(allData);
                        res.json(allData);
                    }
                    // console.log('First then', allData);
                    // res.send(data.data);
                    // rather than rendering, just send back the json data!
                })
                .catch(error => {
                    // log the error before moving on!
                    console.log('The following errors were generated: ', error.message);
                    res.json(error);
                })
            }
        }
    }
    //console.log('outside of everything', allData);
});


app.listen(8080, function() {
  console.log("listening on port 8080");
})