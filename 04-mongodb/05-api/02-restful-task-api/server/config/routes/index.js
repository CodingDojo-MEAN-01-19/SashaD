const router = require('express').Router();

module.exports = router
    .use('/', require('./task.routes'));