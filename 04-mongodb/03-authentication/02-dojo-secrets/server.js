// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
var mongoose = require('mongoose');
// set up other middleware, such as session
const bcrypt = require("bcryptjs");
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
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/dojo_secrets", { useNewUrlParser: true});

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const CommentSchema = new mongoose.Schema({
    content: {
        type: String, 
        required: [true, "Comment must have content"]
    },
    _secret: {
        type: Schema.Types.ObjectId, 
        ref: 'Secret'
    }
}, {timestampts: true});
const SecretSchema = new mongoose.Schema({
    content: {
        type: String, 
        required: [true, "Secret must have content!"]
    },
    _comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});
const UserSchema = new mongoose.Schema({
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
    },
    _secrets: [{type: Schema.Types.ObjectId, ref: 'Secret'}]

}, {timestamps: true});
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User')
mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment') 
mongoose.model('Secret', SecretSchema);
var Secret = mongoose.model('Secret')

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
    res.render('index');
})

app.get("/secrets", function(req, res){
    if(req.session.user_id){
        User.find({_id: req.session.user_id}, function(err, current_user){
            User.find({}, function(err, users){
                if(err) {
                    res.redirect("/");
                }
                else {
                    Secret.find({}).exec(function(err, secrets) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Secrets: ', secrets);
                            console.log('Current User: ', current_user[0]);
                            console.log('All the users: ', users);
                            res.render('dashboard', { secrets:secrets, users: users, current_user: current_user });
                        }
                    })
                }
            });
        })
    }
});

app.post('/register', function(req, res){
    console.log("Creating new user!")
    var user = new User();
    var user_fields = ["email", "first_name", "last_name", "birthday"];
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
                    console.log("*****THERE WAS AN ERROR AT REGISTRATION!******" + err);
                    res.redirect('/');
                }
                else {
                    req.session.user_id = user.__id;
                    console.log("WE MADE IT HERE!")
                    res.redirect('/secrets')
                }
            })
        }
    })
});

app.get("/secrets/:id", function(req, res){
    if(req.session.user_id) {
        User.find({_id: req.session.user_id}, function(err, current_user){
            Secret.find({ _id: req.params.id }).populate('_comments').exec(function(err, secrets) {
                if (err) {
                  console.log(err);
                  res.redirect('/secrets');
                } else {
                  console.log('Details: ', secrets);
                  res.render('secret', { secrets: secrets });
                }
            )};
        )};
    } else {
        console.log('Not logged in');
        res.redirect('/');
    });
});


app.post('/login', function(req, res){
    //console.log("We got here!")
    User.findOne({email: req.body.email}, function(err, user){
        console.log(req.body);
        if(err){
            for(var key in err.errors){
                req.flash('login', err.errors[key].message);
            }
            console.log('something went wrong');
            req.flash('login', "A user with this email does not exist")
            res.redirect('/')
        } else {
            console.log('We found a user with email ' + user.email);
            bcrypt.compare(req.body.password, user.password, function(err, result){
                if(result){
                    req.session.user_id = user._id;
                    res.redirect('/secrets');
                }
                else {
                    req.flash('login', "The email or password did not match our records!")
                    res.redirect('/');
                }
            })
        }
    })
})

app.post('/secrets', function(req, res){
    console.log("POST DATA ########### " , req.body);
    var secret = new Secret({content: req.body.secret})
    secret.save(function(err){
        if(err){
            console.log("We have an error!", err);
            for(var key in err.errors){
                req.flash('secrets', err.errors[key].message);
            }
            res.redirect('/');
        }
        else {
            console.log("Success!!!!")
            res.redirect('/secrets');
        }
    })
})

app.post('/secrets/:id/comments', function(req, res){
    const secretId = req.params.id;
    console.log("POST DATA ########### " , req.body);
    Secret.findOne({ _id: secretId }, function(err, secret) {
		const newComment = new Comment({content: req.body.comment});
		newComment._secret = secret._id;
		Secret.update({ _id: secret._id }, { $push: { _comments: newComment }}, function(err) {});
		newComment.save(function(err) {
			if (err) {
				console.log(err);
				res.render('secret', { errors: newComment.errors });
			} else {
				console.log("comment added");
				res.redirect("/secrets/:id");
			}
		});
	});
});

app.get("/secrets/:id/delete", function(req, res){
    const secretId = req.params.id;
    console.log("POST DATA ########### " , req.body);
    Secret.findOne({ _id: secretId }, function(err, secret) {
		if(err){
            res.redirect('/secrets');
        }
        else {
            secret.remove();
            User.findOne({_secrets: {$elemMatch: {_id: req.params.id}}}, function(err, current_user){
                if(err) {
                    res.redirect("/secrets");
                }
                else {
                    current_user._secrets.id(req.params.id).remove();
                    current_user.save(function(err){
                        res.redirect("/secrets");
                    });
                }
            });
        }
    });
});

app.get("/logout", function(req, res){
    if(req.session.user_id) {
        delete req.session.user_id;
    }
    res.redirect("/");
})

// Setting our Server to Listen on Port: 8000
app.listen(1999, function() {
    console.log("listening on port 1999");
})