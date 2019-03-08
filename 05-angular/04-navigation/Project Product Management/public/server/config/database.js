const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
modelsPath = path.resolve('server', 'models');
//const modelsPath =path.resolve('server', 'models');

mongoose.connect('mongodb://localhost/products_api', {
  useNewUrlParser: true,
  useCreateIndex: true,
});
//Only have the listeners for development mode
mongoose.connection.on('connected', () => console.log('mongodb connected'));
require('../models/product.models.js');

var models_path = path.join(__dirname, '../models');
fs.readdirSync(models_path).forEach(function(file) {
  if (file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
  }
});
