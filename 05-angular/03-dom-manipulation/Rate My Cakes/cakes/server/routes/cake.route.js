const { cakeController } = require('../controllers');
// const bookController = require('../controllers/book.controller'); without barreling
// if you need two controllers instead of writing two lines you can add a comma within the brackets after the first controller

const router = require('express').Router();

module.exports = router
  .get('/', cakeController.index)
  .get('/allCakes', cakeController.getAllCakes)
  .get('/cake/:id', cakeController.getCake)
  .post('/newCake', cakeController.makeNewCake)
  .post('/newRating', cakeController.makeNewRating);

