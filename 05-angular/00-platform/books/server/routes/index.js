const bookRouter = require('./book.route');
const router = require('express').Router();

module.exports = router.use('/books', bookRouter);
