var express = require('express');
var mongoose = require('mongoose');
var parser = require('body-parser');
var path = require('path');

var { Schema } = mongoose;
const port = process.env.PORT || 1999;
var app = express();
// set up other middleware, such as session
const flash = require('express-flash');
const session = require('express-session');
app.use(flash());
app.use(session({
    secret: 'ThisIsASecret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
  }));

app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client/static')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './client/views'));

require('./server/config/database.js');

app.use(require('./server/config/routes'));

app.listen(port, () => console.log(`Listening on port ${ port}`));
//this is the task api assignment