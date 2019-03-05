const Task = require('mongoose').model('Task');
const { Http } = require('@status/codes');
// enum writen representation and status

module.exports = {
  index(req, res) {
    console.log('We got the index');
    // get all resource (tasks)
    Task.find({})
      .then(task => res.json({ tasks: task }))
      .catch(error => res.status(Http.MovedPermanently).json(error));
  },
  show(req, res) {
    //get one resource
    // console.log('We got the one task');
    Task.findById(req.params.id)
      .then(data => res.json({ task: data }))
      .catch(err => res.json({ message: 'Create Task Error', error: err }));
  },
  create(req, res) {
    randId = Math.floor(Math.random() * 1000);
    var task = new Task({
      _id: randId,
      title: req.body.title,
      description: req.body.description,
    });
    // console.log(req.body);
    task
      .save()
      .then(task => res.json({ message: 'Task Created', info: info }))
      .catch(err => res.json({ message: 'Create Task Error', error: err }));
  },
  update(req, res) {
    // update resource
    Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
      context: 'query',
    })
      .then(task => res.json({ message: 'Task Created', info: task }))
      .catch(err => res.json({ message: 'Create Task Error', error: err }));
  },
  destroy(req, res) {
    // delete resource
    Task.findByIdAndRemove(req.params.id)
      .then(task => res.json({ message: 'Task Deleted', info: task }))
      .catch(err => res.json({ message: 'Delete Task Error', error: err }));
  },
};
