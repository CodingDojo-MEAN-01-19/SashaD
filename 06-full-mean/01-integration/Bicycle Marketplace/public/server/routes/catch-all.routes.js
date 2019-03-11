const router = require('express').Router();
const path = require('path');

module.exports = router;

router.all('*', function(_request, response) {
  response.sendFile(path.resolve('dist/public/index.html'));
});
