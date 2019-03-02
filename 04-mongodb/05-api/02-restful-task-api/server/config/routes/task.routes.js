var taskController = require('../../controllers').taskController;
const router = require('express').Router();

router.get('/tasks', taskController.index);
router.get('/tasks/:id', taskController.show);
router.post('/tasks', taskController.create);
router.put('/tasks/:id', taskController.update);
router.delete('/tasks/:id', taskController.destroy);

module.exports = router;