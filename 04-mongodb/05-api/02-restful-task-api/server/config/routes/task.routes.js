var taskController = require('../../controllers').taskController;
const router = require('express').Router();

router.get('/', taskController.index);
router.get('/:id', taskController.show);
router.post('/', taskController.create);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.destroy);

module.exports = router;