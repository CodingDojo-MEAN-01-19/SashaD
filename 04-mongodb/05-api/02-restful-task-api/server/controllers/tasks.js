const Task = require('mongoose').model('Task');
const errorHandler = require('./concerns/error-handler');

module.exports = {
    index: function(req, res){
        Task.find(req.body)
        .then(tasks => res.json(tasks))
        .catch(errorHandler.bind(res));
    },
    show: function(req, res){
        Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(errorHandler.bind(res));
    },
    create: function(req, res){
        Task.create(req.body)
        .then(task => res.json(task))
        .catch(errorHandler.bind(res));
    },
    update: function(req, res){
        Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(task => res.json(task))
        .catch(errorHandler.bind(res));
    },
    destroy: function(req, res){
        Task.findByIdAndRemove(req.params.id)
        .then(result => res.json(result))
        .catch(errorHandler.bind(res));
    }
}