const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const modelsPath = path.join(__dirname, '../models');

mongoose.connect('mongodb://localhost/bikes_api', {
  useNewUrlParser: true,
  useCreateIndex: true,
});
//Only have the listeners for development mode
mongoose.connection.on('connected', () => console.log('mongodb connected'));

fs.readdirSync(modelsPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => require(path.join(modelsPath, file)));
