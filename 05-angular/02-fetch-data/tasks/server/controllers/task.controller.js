const Task = require('mongoose').model('Task');
const { Http } = require('@status/codes');
// enum writen representation and status
module.exports = {
  index(req, res) {
    console.log('We got the index');
    // get all resource (books)
    Task.find({})
      .then(tasks => res.json(console.log(tasks)))
      .catch(error => res.status(Http.MovedPermanently).json(error));
  },
  show(req, res) {
    const { task_id: taskId } = request.params;
    //get one resource
    Task.findById(taskId)
      .then(task => res.json(console.log(task)))
      .catch(error => res.status(Http.MovedPermanently).json(error));
  },
  create(req, res) {
    // create resource
    Task.create(req.body)
      .then(task => res.json(console.log(task)))
      .catch(error => {
        const errors = Object.keys(error.erros).map(
          key => error.errors(key).message
        );
        res.status(Http.UnprocessableEntity).json(errors);
      });
  },
  update(req, res) {
    const { task_id: taskId } = request.params;
    // update resource
    Task.findByIdAndUpdate(taskId, req.body, { new: true })
      .then(task => res.json(console.log(task)))
      .catch(error => {
        const errors = Object.keys(error.erros).map(
          key => error.errors(key).message
        );
        res.status(Http.UnprocessableEntity).json(errors);
      });
  },
  destroy(req, res) {
    // delete resource
    const { task_id: taskId } = req.params;
    Task.findByIdAndRemove(taskId)
      .then(task => res.json(console.log(task)))
      .catch(error => {
        const errors = Object.keys(error.erros).map(
          key => error.errors(key).message
        );
        res.status(Http.UnprocessableEntity).json(errors);
      });
  },
};
