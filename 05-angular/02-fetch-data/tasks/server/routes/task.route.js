const { taskController } = require('../controllers');
// const bookController = require('../controllers/book.controller'); without barreling
// if you need two controllers instead of writing two lines you can add a comma within the brackets after the first controller

const router = require('express').Router();

module.exports = router
  .get('/:id', taskController.show)
  .get('/', taskController.index)
  .post('/', taskController.create)
  .put('/:id', taskController.update)
  .delete('/:id', taskController.destroy);
