const { bookController } = require('../controllers');
// const bookController = require('../controllers/book.controller'); without barreling
// if you need two controllers instead of writing two lines you can add a comma within the brackets after the first controller

const router = require('express').Router();
// normally /books
module.exports = router
	.get('/', bookController.index)
	.post('/', bookController.create)
	.put('/:book_id', bookController.update)
	.get('/:book_id', bookController.show)
	.delete('/:book_id', bookController.destroy);
