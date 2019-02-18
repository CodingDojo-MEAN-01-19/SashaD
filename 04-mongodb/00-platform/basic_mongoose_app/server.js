// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
var mongoose = require('mongoose');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
   })
   mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
   var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
    User.find({}, function(err, users){
        //console.log(users);
        if(err){
            console.log('something went wrong');
        } else {
            console.log('successfully got all the users!');
        }
        res.render('index', {users: users});
    })
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.  
})
// Add User Request 
app.post('/users', function(req, res) {
    console.log("POST DATA ****** ", req.body);
    // This is where we would add the user from req.body to the database.
    var user = new User({name: req.body.name, age: req.body.age});
    // Trey to save that new user to the database (this is the method that actually inserts in the db) and run a callback function with an error (if any) from the operation.
    user.save(function(err){
        //if there is an error console.log that something went wrong!
        if(err){
            console.log('something went wrong');
        } else {
            console.log('successfully added a user!');
        }
        res.redirect('/');
    })
})
app.post('/users', function(req, res) {
    console.log("POST DATA ****** ", req.body);
    // This is where we would add the user from req.body to the database.
    var user = new User({name: req.body.name, age: req.body.age});
    // Trey to save that new user to the database (this is the method that actually inserts in the db) and run a callback function with an error (if any) from the operation.
    user.save(function(err){
        //if there is an error console.log that something went wrong!
        if(err){
            console.log('something went wrong');
        } else {
            console.log('successfully added a user!');
        }
        res.redirect('/');
    })
})
app.post('/users/delete', function(req, res) {
    console.log("POST DATA To Delete ****** ", req.body);
    // This is where we would remove the user from req.body from the database.
    console.log(req.body.name)
    // Try to remove that user from the database 
    // ...delete 1 record by a certain key/value.
    User.remove({name: req.body.name}, function(err){
        // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
        if(err){
            console.log('something went wrong');
        } else {
            console.log('successfully REMOVED the user: ' + req.body.name);
        }
        res.redirect('/');
    })
})
app.post('/users/delete/all', function(req, res) {
    console.log("ALL USERS SUCCESSFULLY DELETED ");
    // This is where we would remove the user from req.body from the database.
    // Try to remove that user from the database 
   // ...delete all records of the User Model
    User.remove({}, function(err){
        // This code will run when the DB has attempted to remove all matching records to {}
        if(err){
            console.log('something went wrong');
        } else {
            console.log('successfully REMOVED ALL USERS');
        }
        res.redirect('/');
    })
})
app.post('/users/edit', function(req, res) {
    console.log("POST DATA To Edit ****** ", req.body);
    // This is where we would remove the user from req.body from the database.
    console.log(req.body.name);
    console.log(req.body.age);
    // Try to remove that user from the database 
    // ...delete 1 record by a certain key/value.
    User.findOne({name: req.body.name}, function(err, user){
        // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
        if(err){
            console.log('something went wrong');
        } else {
            user.name = req.body.name_change;
            user.age = req.body.age;
            user.save(function(err){
                console.log('successfully EDITED the user: ' + req.body.name);
            }) 
        }
        res.redirect('/');
    })
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})