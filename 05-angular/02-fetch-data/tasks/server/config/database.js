const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
modelsPath = path.resolve('server', 'models');
//const modelsPath =path.resolve('server', 'models');

mongoose.connect('mongodb://localhost/restful_task_api', {
  useNewUrlParser: true,
  useCreateIndex: true,
});
//Only have the listeners for development mode
mongoose.connection.on('connected', () => console.log('mongodb connected'));

fs.readdirSync(modelsPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => require(path.join(modelsPath, file)));
