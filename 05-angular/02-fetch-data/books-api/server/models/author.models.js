const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const { Schema } = mongoose;
// trying a different validator so I can get errors to appear
var infoValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 50],
    message:
      'Info provided should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Info provided should contain alpha-numeric characters only',
  }),
];
var AuthorSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      validate: infoValidator,
    },
    last_name: {
      type: String,
      required: true,
      minlength: 2,
      validate: infoValidator,
    },
    country_of_origin: {
      type: String,
      required: true,
      minlength: 3,
      validate: infoValidator,
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
          minlength: 3,
          required: true,
          validate: infoValidator,
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
