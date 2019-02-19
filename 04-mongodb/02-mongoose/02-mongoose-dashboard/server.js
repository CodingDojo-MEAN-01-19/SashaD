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
// This is how we connect to the mongodb database using mongoose 
mongoose.connect('mongodb://localhost/rabbit_dashboard');
var RabbitSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please type a name'],
        minlength: [6, 'Name must be longer than 6 characters!']
        },
    age: {
        type: Number,
        required: [true, 'Please give an age to enter!'],
        min: [2, "You are too young!" ]
    },
    favorite_food: {
        type: String, 
        required: [true, 'We need to know what you like to eat!'], 
        minlength: [3, 'Most foods have more than 3 characters!!']
    }
   }, {timestamps: true});
   mongoose.model('Rabbit', RabbitSchema); // We are setting this Schema in our Models as 'User'
   var Rabbit = mongoose.model('Rabbit') // We are retrieving this Schema from our Models, named 'User'
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
    Rabbit.find({}, function(err, rabbits){
        //console.log(rabbits);
        if(err){
            console.log('something went wrong');
        } else {
            console.log('successfully got all the rabbits!');
            res.render('index', {rabbits: rabbits});
        }
    })
})
app.get('/rabbits/new', function(req, res){
    res.render('new_rabbit');
})
app.post('/rabbits', function(req, res){
    console.log("POST DATA ********", req.body);
    var rabbit = new Rabbit({name: req.body.name, age: req.body.age, favorite_food: req.body.favorite_food});
    //Save the new bunny
    rabbit.save(function(err){
        if(err){
            console.log("We have an error!", err);
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/rabbits/new');
        }
        else {
            res.redirect('/');
        }
    })
})
app.get('/rabbits/:id', function(req, res){
    var rabbit = req.params.id;
    console.log("Got the ID! " + rabbit);
    Rabbit.find({_id: rabbit}, function(err, rabbits){
        console.log(rabbits)
        if(err){
            console.log('something went wrong');
        } else {
            //console.log('successfully got the rabbit!');
            res.render('rabbit', {rabbits: rabbits});
        }
    })
})
//Used findById here instead
app.get('/rabbits/edit/:id', function(req, res){
    var rabbitid = req.params.id;
    console.log("Got the ID! " + rabbitid);
    Rabbit.findById((rabbitid), function(err, rabbit){
        console.log(rabbitid)
        if(err){
            console.log('something went wrong');
        } else {
            console.log('successfully got the rabbit to make available to edit info!');
            res.render('edit_rabbit', {rabbit: rabbit});
        }
    })
})
app.post('/rabbits/:id', function(req, res){
    var rabbitid = req.params.id;
    console.log("******Got the id: " + rabbitid + "*******");
    console.log("SO THE ROUTING WORKS!!!!")
    console.log("POST DATA To Edit ****** ", req.body);
    // This is where we would remove the user from req.body from the database.
    // Try to remove that user from the database 
    // ...delete 1 record by a certain key/value.
    Rabbit.findById((rabbitid), function(err, rabbit){
        // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
        if(err){
            console.log('something went wrong');
        } else {
            rabbit.name = req.body.name_change;
            rabbit.age = req.body.age_change;
            rabbit.favorite_food = req.body.new_favorite_food;
            rabbit.save(function(err){
                if(err){
                    // if there is an error upon saving, use console.log to see what is in the err object 
                    console.log("We have an error!", err);
                    // adjust the code below as needed to create a flash message with the tag and content you would like
                    for(var key in err.errors){
                        //should be different error so that the error shows up above the edits not both the new user and the edits
                        req.flash('editerror', err.errors[key].message);
                    }
                    // redirect the user to an appropriate route
                    res.redirect('/rabbits/edit/' + rabbitid);
                }
                else {
                    console.log(rabbitid + " Change was a success!")
                    res.redirect('/');
                }
            });
        }
    });
});
app.get('/rabbits/destroy/:id', function(req, res){
    console.log(req.params.id);
    Rabbit.deleteOne({_id: req.params.id}, function(err){
        if(err){
            console.log("something sent wrong");
        } else {
            console.log("successfully Removed the rabbit: " + req.params.id);
        }
    })
    res.redirect('/');
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})