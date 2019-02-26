const parser = require('body-parser');
var mongoose = require('mongoose');
const port = process.env.PORT || 8000;
// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();  

mongoose.connect('mongodb://localhost/1955_api');

var PersonSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
        }
   }, {timestamps: true});

mongoose.model('Person', PersonSchema);
 // We are setting this Schema in our Models as 'User'
var Person = mongoose.model('Person')

app.use(parser.json());
//The page that shows the entire api
app.get('/', function(req, res){
    Person.find({}, function(err, people){
        if (err){
            console.log("Returned error ", err);
            //respond w/ json
            res.json({message: "Erro", err: err});
        }
        else{
            res.json({message: "Success ", data: people})
        }
    })
});
app.get('/new/:name', function(req, res){
    var new_person = new Person({name: req.params.name});
    new_person.save(function(err){
        if(err){
            console.log("We have an error!", err);
            res.redirect('/')
        }
        else {
            res.redirect('/')
        }
    })
});
app.get('/remove/:name', function(req, res){
    Person.deleteOne({name: req.params.name}, function(err, person){
        if(err){
            console.log("Something went wrong");
        } else {
            console.log("Successfully removed the person: " + req.params.name);
            res.redirect('/')
        }
    })
});
app.get('/:name', function(req, res){
    Person.find({name: req.params.name}, function(err, person){
        if (err){
            console.log("Returned error ", err);
            //respond w/ json
            res.json({message: "Erro", err: err});
        }
        else{
            res.json({message: "Success ", data: person})
        }
    })
});
app.listen(port, () => console.log(`Listening on port ${ port}`));
//this is the 1955-api assignment