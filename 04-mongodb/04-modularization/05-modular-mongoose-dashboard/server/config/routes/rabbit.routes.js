var rabbitController = require('../../controllers').rabbitController;
const router = require('express').Router();

router.get('/', rabbitController.index);
router.post('/rabbits', rabbitController.create);
router.get('/rabbits/new', rabbitController.form);
router.get('/rabbits/:id', rabbitController.read);
router.get('/rabbits/edit/:id', rabbitController.updateform);
router.post('/rabbits/:id', rabbitController.update)


module.exports = router; 