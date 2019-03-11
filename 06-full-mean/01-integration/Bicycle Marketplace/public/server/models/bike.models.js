const mongoose = require('mongoose');

const { Schema } = mongoose;

var BikeSchema = new Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Must give a title'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Must provide a short description'],
      maxlength: [200, 'The description must not be more than 200 characters'],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, 'You must provide a price'],
      min: [1, 'The price must at least be $1'],
    },
    location: {
      type: String,
      trim: true,
      required: [true, 'Please give a location'],
    },
    url: {
      type: String,
      trim: true,
      required: [true, 'You must provide a picture of the bike'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bike', BikeSchema);
