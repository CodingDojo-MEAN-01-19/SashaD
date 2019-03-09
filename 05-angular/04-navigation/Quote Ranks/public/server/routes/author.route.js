const { authorController } = require('../controllers');
// const bookController = require('../controllers/book.controller'); without barreling
// if you need two controllers instead of writing two lines you can add a comma within the brackets after the first controller

const router = require('express').Router();

module.exports = router
  .get('/', authorController.index)
  .get('/:id', authorController.show)
  .post('/new', authorController.create)
  .put('/quotes/:id', authorController.update)
  .put('/:id', authorController.editAuthor)
  .patch('/quotes/vote/:id', authorController.quoteUpdate)
  .put('/quotes/delete/:id', authorController.destroy);
