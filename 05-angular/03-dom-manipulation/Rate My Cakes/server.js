const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  port = process.env.PORT || 5000,
  app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/dist/public'));

require('./server/config/database.js');
app.use(require('./server/routes'));

app.listen(port, () => console.log(`express server listening on port ${port}`));