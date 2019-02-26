var mongoose = require('mongoose');
var { Schema } = mongoose;

var QuoteSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please type a name'],
        minlength: [6, 'First name must be longer than 6 characters!']
        },
    quote: {
        type: String, 
        required: [true, 'User must give a quote with name'], 
        minlength: [6, 'The quote must be longer than 6 characters!']
    }
   }, {timestamps: true});

module.exports = mongoose.model('Quote', QuoteSchema)