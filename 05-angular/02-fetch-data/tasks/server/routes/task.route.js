const { taskController } = require('../controllers');
// const bookController = require('../controllers/book.controller'); without barreling
// if you need two controllers instead of writing two lines you can add a comma within the brackets after the first controller

const router = require('express').Router();
// normally /books
module.exports = router
  .get('/', taskController.index)
  .post('/', taskController.create)
  .put('/:task_id', taskController.update)
  .get('/:task_id', taskController.show)
  .delete('/:task_id', taskController.destroy);
