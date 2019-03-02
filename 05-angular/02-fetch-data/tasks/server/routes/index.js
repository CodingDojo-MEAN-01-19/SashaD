const taskRouter = require('./task.route');
const router = require('express').Router();
//This below ensures that tasks is prepended before the other routes RESTful!
module.exports = router.use('/tasks', taskRouter);
