const mongoose = require('mongoose');

const { Schema } = mongoose;

var AuthorSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      minlength: 2,
    },
    last_name: {
      type: String,
      required: true,
      minlength: 2,
    },
    country_of_origin: {
      type: String,
      required: true,
      minlength: 3,
    },
    birthdate: {
      type: Date,
      required: true,
      max: Date.now,
    },
    books: [
      {
        title: {
          type: String,
          required: true,
          minlength: 2,
        },
        publication_year: {
          type: Date,
          required: true,
          max: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Author', AuthorSchema);
