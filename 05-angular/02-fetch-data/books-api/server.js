const express = require('express');
const parser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 1999;
const app = express();
//point to the database configuration
require('./server/config/database');

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(express.static('dist/books-api'));
app.use(require('./server/routes'));

app.listen(port, () => console.log(`express server listening on port ${port}`));
