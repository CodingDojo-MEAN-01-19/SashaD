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
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/message_board');
const CommentSchema = new mongoose.Schema({
    name: {type: String, required: [true, "You must provide a name for the comment"]},
    content: {type: String, required: [true, "Comment must have content"]},
    _message: {type: Schema.Types.ObjectId, ref: 'Message'}
}, {timestampts: true});
const MessageSchema = new mongoose.Schema({
    name: {type: String, required: [true, "You must provide a name for your message"]},
    content: {type: String, required: [true, "Message must have content!"]},
    _comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});
mongoose.model('Comment', CommentSchema); 
mongoose.model('Message', MessageSchema);

const Comment = mongoose.model('Comment');
const Message = mongoose.model('Message'); // We are retrieving this Schema from our Models, named 'User'
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
    Message.find({}).populate('_comments').exec(function(err, messages){
        if(err){
            console.log('something went wrong');
        } else {
            console.log('Successfully got all the messages!');
        }
        res.render('index', {messages: messages});
    })
})
app.post('/message', function(req, res){
    console.log("POST DATA ########### " , req.body);
    var message = new Message({name: req.body.name, content: req.body.message})
    message.save(function(err){
        if(err){
            console.log("We have an error!", err);
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        }
        else {
            console.log("Success!!!!")
            res.redirect('/');
        }
    })
})

app.post('/comment/:id', function(req, res){
    const messageId = req.params.id;
    console.log("POST DATA ########### " , req.body);
    Message.findOne({ _id: messageId }, function(err, message) {
		const newComment = new Comment({ name: req.body.name, content: req.body.comment });
		newComment._message = message._id;
		Message.update({ _id: message._id }, { $push: { _comments: newComment }}, function(err) {

		});
		newComment.save(function(err) {
			if (err) {
				console.log(err);
				res.render('index', { errors: newComment.errors });
			} else {
				console.log("comment added");
				res.redirect("/");
			}
		});
	});
});
  
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})