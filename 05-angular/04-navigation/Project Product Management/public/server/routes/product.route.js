const { productController } = require('../controllers');
// const bookController = require('../controllers/book.controller'); without barreling
// if you need two controllers instead of writing two lines you can add a comma within the brackets after the first controller

const router = require('express').Router();

module.exports = router
  .get('/', productController.index)
  .get('/edit/:id', productController.show)
  .post('/new', productController.create)
  .put('/edit/:id', productController.update)
  .delete('/:id', productController.destroy)
  .all('*', (req, res, next) => {
    res.sendFile(path.resolve('./dist/index.html'));
  });
