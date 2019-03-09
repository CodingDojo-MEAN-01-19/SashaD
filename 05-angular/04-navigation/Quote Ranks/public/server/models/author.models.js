const mongoose = require('mongoose');

const { Schema } = mongoose;

var AuthorSchema = new Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      minlength: [3, 'Name must be at least 3 characters'],
      required: [true, 'Must give name'],
    },
    quotes: [
      {
        _id: {
          type: String,
        },
        content: {
          type: String,
          minlength: [3, 'Quote must be at least 3 characters'],
          required: [true, 'Must give quote'],
        },
        votes: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Author', AuthorSchema);
