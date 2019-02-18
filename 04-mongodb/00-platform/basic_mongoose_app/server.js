// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
var mongoose = require('mongoose');
// set up other middleware, such as session
const flash = require('express-flash');
app.use(flash());
const session = require('express-session');
app.use(session({
    secret: 'ThisIsASecret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
  }));
// validate email?
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');
var UserSchema = new mongoose.Schema({
    first_name: {
        type: String, 
        required: [true, 'Please type a name'],
         minlength: [6, 'First name must be longer than 6 characters!']
        },
    last_name: {
        type: String, 
        required: [true, 'User must provide last name!'], 
        minlength: [6, 'The last name must be longer than 6 characters!']
    },
    age: {
        type: Number, 
        min: [10, 'Must at least be 10!'], 
        max: [150, 'No one is that old!']
    },
    email: {
        type: String, 
        required: [true, 'User must provide a valid email!'],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
   }, {timestamps: true});
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
    var user = new User({first_name: req.body.first_name, last_name: req.body.last_name, age: req.body.age, email: req.body.email});
    // Trey to save that new user to the database (this is the method that actually inserts in the db) and run a callback function with an error (if any) from the operation.
    user.save(function(err){
        if(err){
            // if there is an error upon saving, use console.log to see what is in the err object 
            console.log("We have an error!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            // redirect the user to an appropriate route
            res.redirect('/');
        }
        else {
            res.redirect('/');
        }
    });
})
// Delete a User by their name
app.post('/users/delete', function(req, res) {
    console.log("POST DATA To Delete ****** ", req.body);
    // This is where we would remove the user from req.body from the database.
    console.log(req.body.first_name)
    // Try to remove that user from the database 
    // ...delete 1 record by a certain key/value.
    User.deleteOne({first_name: req.body.first_name}, function(err){
        // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
        if(err){
            console.log('something went wrong');
        } else {
            console.log('successfully REMOVED the user: ' + req.body.first_name);
        }
        res.redirect('/');
    })
})
// Delete all the users
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
// Edit a users info
app.post('/users/edit', function(req, res) {
    console.log("POST DATA To Edit ****** ", req.body);
    // This is where we would remove the user from req.body from the database.
    console.log(req.body.name);
    console.log(req.body.age);
    // Try to remove that user from the database 
    // ...delete 1 record by a certain key/value.
    User.findOne({first_name: req.body.first_name}, function(err, user){
        // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
        console.log(req.body);
        if(err){
            console.log('something went wrong');
        } else {
            user.first_name = req.body.first_name_change;
            user.last_name = req.body.last_name_change;
            user.age = req.body.age;
            user.email = req.body.email;
            user.save(function(err){
                if(err){
                    // if there is an error upon saving, use console.log to see what is in the err object 
                    console.log("We have an error!", err);
                    // adjust the code below as needed to create a flash message with the tag and content you would like
                    for(var key in err.errors){
                        //should be different error so that the error shows up above the edits not both the new user and the edits
                        req.flash('editerror', err.errors[key].message);
                    }
                    // redirect the user to an appropriate route
                    res.redirect('/');
                }
                else {
                    res.redirect('/');
                }
            });
        }
    });
});
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})