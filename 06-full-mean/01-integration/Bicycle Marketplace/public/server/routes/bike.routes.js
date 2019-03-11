const { bikeController } = require('../controllers');
const router = require('express').Router();

// bikes

module.exports = router
  .get('/', bikeController.index)
  .get('/mybikes', bikeController.getAllMyBikes)
  .post('/', bikeController.create)
  .put('/:bike_id', bikeController.update)
  .delete('/:bike_id', bikeController.destroy);
