const express = require('express');
const parser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 1999;
const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(express.static(path.join(__dirname, './public/dist/public')));

app.require('./server/config/routes.js');

app.listen(port, () => console.log(`express server listening on port ${port}`));