const mongoose = require('mongoose');

const { Schema } = mongoose;

var RatingSchema = new Schema(
  {
    _id: {
      type: String
    },
    stars: {
      type: Number,
      required: [true, 'You must give the cake a rating']
    },
    comment: {
      type: String,
      default: ''
  }
  });

var CakeSchema = new Schema(
  {
    _id: {
      type: String,
    },
    baker_name: {
      type: String,
      required: [true, 'You must provide a name'],
      minlength: [4, 'The name must be longer than four characters'],
    },
    image_url: {
      type: String,
      required: [true, 'You must provide a photo of cake to rate'],
    },
    _ratings: [RatingSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cake', CakeSchema);
