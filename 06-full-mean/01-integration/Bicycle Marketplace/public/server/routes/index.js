const userRouter = require('./user.routes');
const bikeRouter = require('./bike.routes');
const router = require('express').Router();
const apiRouter = require('express').Router();
const catchAll = require('./catch-all.routes');

router.use('/user', userRouter).use('/bikes', bikeRouter);

module.exports = apiRouter.use('/api', router).use(catchAll);
