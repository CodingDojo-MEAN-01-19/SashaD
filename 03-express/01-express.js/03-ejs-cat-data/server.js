var express = require("express");
var app = express();

app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get('/', function(request, response){
  response.render('cats');
});
app.get('/cats', function(request, response){
  response.render('cats');
});
app.get("/cuddles", function (request, response){
  // hard-coded cat data
  var cat_info = {
    name: 'Cuddles',
    food: "Spaghetti", 
    age: "3", 
    sleeping_spots: ['under the bed', 'in a sunbeam']
  };
  response.render('details', {details: cat_info});
})
app.get("/pippin", function (request, response){
  // hard-coded cat data
  var cat_info = {
    name: 'Pippin',
    food: "Fish", 
    age: "5", 
    sleeping_spots: ['under the bed', 'on the fridge']
  };
  response.render('details', {details: cat_info});
})
app.get("/friday", function (request, response){
  // hard-coded cat data
  var cat_info = {
    name: 'Friday',
    food: "Beef", 
    age: "1", 
    sleeping_spots: ["on my owner's bed", 'the arm of the couch']
  };
  response.render('details', {details: cat_info});
})
app.listen(8000, function() {
  console.log("listening on port 8000");
})