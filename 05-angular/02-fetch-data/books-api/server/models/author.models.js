const mongoose = require('mongoose');
const path = require('path');

const { Schema } = mongoose;
// Did not like separate validator
var AuthorSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Must provide first name'],
      minlength: [4, 'First name must be longer than 3 characters'],
    },
    last_name: {
      type: String,
      required: [true, 'Must provide last name'],
      minlength: [4, 'Last name must be longer than 3 characters'],
    },
    country_of_origin: {
      type: String,
      required: [true, 'Must provide a country of origin'],
      minlength: [3, 'The length must be at least 3 characters'],
    },
    birthdate: {
      type: Date,
      validate: {
        validator: function(v) {
          v.setFullYear(v.getFullYear() + 1);
          const currentTime = new Date();
          currentTime.setHours(0, 0, 0, 0);
          return v.getTime() <= currentTime.getTime();
        },
        message: props => 'You must be at least 1 years old.',
      },
      required: [true, 'You must provide a birthdate'],
    },
    books: [
      {
        title: {
          type: String,
          minlength: 2,
          required: true,
        },
        publication_year: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Author', AuthorSchema);
