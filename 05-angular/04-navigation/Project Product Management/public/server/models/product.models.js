const mongoose = require('mongoose');

const { Schema } = mongoose;

var ProductSchema = new Schema(
  {
    _id: {
      type: String,
    },
    title: {
      type: String,
      required: [true, 'You must provide a title'],
      minlength: [2, 'The title must be longer than two characters'],
    },
    price: {
      type: Number,
      required: [true, 'You must provide a price for the product'],
      min: [0.99, 'The product must be at least $.99'],
    },
    url: {
      type: String,
      required: [true, 'You must provide a picture url'],
      minlength: [10, 'The url must be long enough to be real'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
