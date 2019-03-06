const { cakeController } = require('../controllers');
// const bookController = require('../controllers/book.controller'); without barreling
// if you need two controllers instead of writing two lines you can add a comma within the brackets after the first controller

const router = require('express').Router();

module.exports = router
  .get('/:id', cakeController.show)
  .get('/', cakeController.index)
  .post('/', cakeController.create)
  .put('/:id', cakeController.rate)
  .delete('/:id', cakeController.destroy);
