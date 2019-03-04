const mongoose = require('mongoose');

const { Schema } = mongoose;

var TaskSchema = new Schema(
  {
    _id: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
