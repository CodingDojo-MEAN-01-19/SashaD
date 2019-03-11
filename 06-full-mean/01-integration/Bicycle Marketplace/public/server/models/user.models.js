const uniquePlugin = require('mongoose-unique-validator');
const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

var UserSchema = new Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: [true, 'Please type a name'],
      minlength: [4, 'First name must be longer than 6 characters!'],
    },
    last_name: {
      type: String,
      trim: true,
      required: [true, 'User must provide last name!'],
      minlength: [6, 'The last name must be longer than 6 characters!'],
    },
    email: {
      type: String,
      required: [true, 'User must provide a valid email!'],
      unique: true,
      trim: true,
      validate: {
        validator(value) {
          return validator.isEmail(value);
        },
      },
    },
    password: {
      type: String,
      required: [true, 'Please type in a password'],
      minlength: [16, 'Password must be at least 8 characters in length'],
    },
    bikes: [
      {
        bike_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Bike',
        },
      },
    ],
  },
  { timestamps: true }
);

// To show if email is unique
UserSchema.plugin(uniquePlugin, { message: `{VALUE} is not unique` });
// To hash password
UserSchema.pre('validate', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt
    .hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(next);
});
// To check password on login
UserSchema.static('validatePassword', function(
  candidatePassword,
  hashedPassword
) {
  return bcrypt.compare(candidatePassword, hashedPassword);
});

module.exports = mongoose.model('User', UserSchema);
