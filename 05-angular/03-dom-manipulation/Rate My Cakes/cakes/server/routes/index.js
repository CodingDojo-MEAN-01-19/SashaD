const cakeRouter = require('./cake.route');
const router = require('express').Router();
//This below ensures that cakes is prepended before the other routes RESTful!
module.exports = router.use('/cakes', cakeRouter);
