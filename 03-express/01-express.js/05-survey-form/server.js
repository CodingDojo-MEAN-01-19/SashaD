var express = require("express");
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use(session({
  secret: 'ThisIsASecret',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}));

app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
  res.render('index');
});

app.post('/pass', function(req, res){
  //console.log(req.body)
  req.session.name = req.body.name;
  //console.log(req.session.name);
  req.session.location = req.body.location;
  //console.log(req.session.location);
  req.session.language = req.body.language;
  //console.log(req.session.language);
  req.session.comment = req.body.comment;
  //console.log(req.session.comment);
  res.redirect('/result');
});
app.get('/result/', function (req, res){
  res.render('result', {name: req.session.name, language: req.session.language, location: req.session.location, comment: req.session.comment})
})

app.listen(8000, function() {
  console.log("listening on port 8000");
})