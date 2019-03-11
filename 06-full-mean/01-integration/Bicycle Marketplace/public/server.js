const express = require('express');
const parser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000;
const app = express();
//point to the database configuration

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static('dist/public'));
app.use(cookieParser('askdjflaksjdfhaslkjdfhalskjdfh'));
app.use(
  session({
    saveUninitialized: true,
    secret: 'session-secer4t',
    resave: false,
    name: 'session',
    rolling: true,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 3600000,
    },
  })
);

require('./server/config/database.js');
app.use(require('./server/routes'));

app.all('*', (req, res, next) => {
  res.sendFile(path.resolve('./dist/public/index.html'));
});

app.listen(port, () => console.log(`express server listening on port ${port}`));
