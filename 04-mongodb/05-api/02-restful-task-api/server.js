const parser = require('body-parser');
var mongoose = require('mongoose');
const port = process.env.PORT || 8000;
// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();  

mongoose.connect('mongodb://localhost/restful_task_api');

var TaskSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

mongoose.model('Task', TaskSchema);
 // We are setting this Schema in our Models as 'User'
var Task = mongoose.model('Task')

app.use(parser.json());
//Need to handle errors!
//Can modularize later to handle errors and routes in different files
app.get('/', function(req, res){
    Task.find(req.body)
        .then(tasks => res.json(tasks))
        .catch();
});

app.get('/:id', function(req, res){
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch();
});

app.post('/', function(req, res){
    Task.create(req.body)
      .then(task => res.json(task))
      .catch();
});

app.put('/:id', function(req, res){
    Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(task => res.json(task))
    .catch();
});

app.delete('/:id', function(req, res){
    Task.findByIdAndRemove(req.params.id)
      .then(result => res.json(result))
      .catch();
});

app.listen(port, () => console.log(`Listening on port ${ port}`));
//this is the 1955-api assignment