const User = require('mongoose').model('User');
const { Http } = require('@status/codes');

module.exports = {
  login(req, res) {
    const { email, password } = req.body;
    console.log('Logging in ', password, email);

    User.findOne({ email })
      .then(user => {
        return User.validatePassword(password, user.password).then(isValid => {
          if (!isValid) {
            throw new Error();
          } else {
            completeLogin(req, res, user);
          }
        });
      })
      .catch(() => {
        res.status(Http.Unauthorized).json('email/password combo not valid');
      });
  },
  register(req, res) {
    var user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });
    user
      .save()
      .then(user => {
        console.log('Still have the user? ' + user);
        completeLogin(req, res, user);
      })
      .catch(error => {
        console.log('failure', error);
        res.status(Http.UnprocessableEntity).json({
          errors: Object.keys(error.errors).map(
            key => error.errors[key].message
          ),
        });
      });
  },
  logout(req, res) {
    console.log('Logging out');
    req.session.destroy();
    res.clearCookie('userId');
    res.clearCookie('expiration');

    res.json(true);
  },
  findById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate({
        path: 'listings',
        model: 'Bike'
      })
      .exec((err, user) => {
        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(400).json({
            message: 'Failed to populate listings for user',
            errors: err
          });
      }
    })
  },
  session() {
    return res.json({});
  }
};

function completeLogin(req, res, user) {
  console.log('Completing login!');
  req.session.user = user;
  console.log('Got the user ' + req.session.user);
  delete req.session.user.password;

  res.cookie('userId ', user._id.toString());
  res.cookie('expiration ', Date.now() + 864000 * 1000);
  res.json(req.session.user);
}
