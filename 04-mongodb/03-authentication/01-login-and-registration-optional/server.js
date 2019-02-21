// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
var mongoose = require('mongoose');
// set up other middleware, such as session
const flash = require('express-flash');
app.use(flash());
const session = require('express-session');
app.set('trust proxy', 1);
app.use(session({
    secret: 'ThisIsASecret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
  }));
const bcrypt = require('bcryptjs');
// validate email?
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/login_registration');
var UserSchema = new mongoose.Schema({
    first_name: {
        type: String, 
        required: [true, 'Please type a name'],
         minlength: [4, 'First name must be longer than 6 characters!']
        },
    last_name: {
        type: String, 
        required: [true, 'User must provide last name!'], 
        minlength: [6, 'The last name must be longer than 6 characters!']
    },
    email: {
        type: String, 
        required: [true, 'User must provide a valid email!'],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please type in a password'],
        minlength: [4, 'Password must be at least 8 characters in length']
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
    //Just render
    res.render('index');
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.  
})
// Add User Request 
app.post('/registration', function(req, res) {
    var user = new User();
    var user_fields = ["email", "first_name", "last_name"];
    for(var i = 0; i < user_fields.length; i++){
        user[user_fields[i]] = req.body[user_fields[i]];
    }
    bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err){
            res.redirect('/');
        }
        else {
            user.password = hash;
            user.save(function(err, user){
                if(err){
                    console.log(err);
                    res.redirect('/');
                }
                else {
                    req.session.user_id = user.__id;
                    res.render('dashboard', {user: user})
                }
            })
        }
    })
})
//login
app.post('/login', function(req, res) {
    console.log("POST DATA To Login ****** ", req.body);
    
    User.findOne({email: req.body.email}, function(err, user){
        console.log(req.body);
        if(err){
            for(var key in err.errors){
                req.flash('login', err.errors[key].message);
            }
            console.log('something went wrong');
            res.redirect('/')
        } else {
            console.log('We found a user with email ' + user.email);
            bcrypt.compare(req.body.password, user.password, function(err, result){
                if(result){
                    req.session.user_id = user._id;
                    res.render('dashboard', {user: user});
                }
                else {
                    req.flash('login', "The email or password did not match our records!")
                    res.redirect('/');
                }
            })
        }
    })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})