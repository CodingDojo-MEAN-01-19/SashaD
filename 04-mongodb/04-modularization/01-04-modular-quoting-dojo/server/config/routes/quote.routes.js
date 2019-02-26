var quoteController = require('../../controllers').quoteController;
const router = require('express').Router();

router.get('/', quoteController.index);
router.post('/quotes', quoteController.create);
router.get('/view/quotes', quoteController.read);

module.exports = router; 
