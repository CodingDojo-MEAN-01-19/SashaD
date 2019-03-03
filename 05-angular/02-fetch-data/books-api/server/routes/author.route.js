const { authorController } = require('../controllers');
// const bookController = require('../controllers/book.controller'); without barreling
// if you need two controllers instead of writing two lines you can add a comma within the brackets after the first controller
const router = require('express').Router();
// the index.js file in routes prepends /authors before all of these routes
module.exports = router
  .get('/', authorController.index)
  .post('/', authorController.create)
  .put('/book/:author_id', authorController.createBook)
  .put('/:author_id', authorController.update)
  .get('/:author_id', authorController.show)
  .delete('/:author_id', authorController.destroy);
