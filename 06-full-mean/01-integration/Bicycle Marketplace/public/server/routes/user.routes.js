const { userController } = require('../controllers');
// const bookController = require('../controllers/book.controller'); without barreling
// if you need two controllers instead of writing two lines you can add a comma within the brackets after the first controller

const router = require('express').Router();

module.exports = router
  .post('/login', userController.login)
  .post('/register', userController.register)
  .delete('/logout', userController.logout);
