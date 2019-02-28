var mongoose = require('mongoose');
var { Schema } = mongoose;

var TaskSchema = new mongoose.Schema({
    itle: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Task', TaskSchema)