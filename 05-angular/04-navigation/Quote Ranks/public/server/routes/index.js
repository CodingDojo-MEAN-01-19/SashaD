const authorRouter = require('./author.route');
const router = require('express').Router();
//This below ensures that tasks is prepended before the other routes RESTful!
module.exports = router.use('/authors', authorRouter);
