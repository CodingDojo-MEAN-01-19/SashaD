var express = require("express");
var app = express();
var session = require('express-session');

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use(session({
  secret: 'ThisIsASecret',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}));

app.get('/', function(req, res){
  if(!session.hasOwnProperty('count')){
    session.count = 1;
  }
  else {
    session.count += 1;
  }
  res.render('index', {count: session.count});
});
app.get('/add', function(req, res){
  session.count = session.count + 1;
  // console.log(session.count)
  res.redirect('/');
});
app.get('/delete', function(req, res){
  session.count = 0;
  // console.log(session.count)
  res.redirect('/');
});
//The below did not work
// app.get('/', function(request, response){
//   request.session.count = 1;
//   response.render('index');
// });
// app.post('/', function(req, res){
//   if(req.session.count){
//     req.session.count++;
//   } else{
//     req.session.count = 1;
//   };
//   console.log(req.session.count);
//   res.render('/');
// });

app.listen(8000, function() {
  console.log("listening on port 8000");
})