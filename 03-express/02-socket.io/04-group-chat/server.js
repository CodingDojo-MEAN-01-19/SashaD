const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// tell the express app to listen on port 1999
const server = app.listen(1999, function() {
  console.log("listening on port 1999");
});

// load the routes file, pass app and server into it (for handling url visits and events)
require('./routes/index.js')(app, server);


//The supposed answer.... 
// It isn't loading properly
