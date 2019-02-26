var mongoose = require('mongoose');
var { Schema } = mongoose;

var RabbitSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please type a name'],
        minlength: [6, 'Name must be longer than 6 characters!']
        },
    age: {
        type: Number,
        required: [true, 'Please give an age to enter!'],
        min: [2, "You are too young!" ]
    },
    favorite_food: {
        type: String, 
        required: [true, 'We need to know what you like to eat!'], 
        minlength: [3, 'Most foods have more than 3 characters!!']
    }
   }, {timestamps: true});
   
module.exports = mongoose.model('Rabbit', RabbitSchema)