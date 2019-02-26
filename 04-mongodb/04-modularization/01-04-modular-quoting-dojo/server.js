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
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/quoting_dojo');
var QuoteSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please type a name'],
        minlength: [6, 'First name must be longer than 6 characters!']
        },
    quote: {
        type: String, 
        required: [true, 'User must give a quote with name'], 
        minlength: [6, 'The quote must be longer than 6 characters!']
    }
   }, {timestamps: true});
   mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
   var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'User'
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
require('./server/config/routes.js')(app)
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})