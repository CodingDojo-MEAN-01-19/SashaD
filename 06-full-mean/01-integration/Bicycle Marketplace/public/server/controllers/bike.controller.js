const Bike = require('mongoose').model('Bike');
const User = require('mongoose').model('User');
const { Http } = require('@status/codes');
// enum writen representation and status

module.exports = {
  // get all Bikes
  index(req, res) {
    console.log('Getting the bikes');
    Bike.find({})
      .then(bikes => {
        var userid = req.session.user._id;
        console.log('This is within the finding of bikes: ' + userid);
        res.json({ bikes: bikes, userid: userid });
      })
      .catch(error => {
        console.log('Cannot find bikes' + error);
      });
  },
  getAllMyBikes(req, res) {
    console.log('I am finding my BIKES');
    User.findOne({ _id: req.session.user })
      .populate('bikes')
      .exec()
      .then(user => {
        let mybikes = user.bikes;
        res.json(mybikes);
      })
      .catch((errror = res.status(Http.InternalServerError).json(error)));
  },
  create(req, res) {
    console.log('Did we even get here? ');
    let new_bike = new Bike({
      userid: req.session.user,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      location: req.body.location,
      url: req.body.url,
    });
    new_bike
      .save()
      .then(bike => {
        console.log('Got the bike? ' + bike);
        User.findByIdAndUpdate(req.session.user._id, {
          $push: { bikes: { _id: bike['_id'] } },
        })
          .then(user => {
            console.log('Did we change the user? ' + JSON.stringify(user));
          })
          .catch(error => {
            console.log('Failure to create bike ' + error),
              res.json({
                errors: Object.keys(error.errors).map(
                  key => error.errors[key].message
                ),
              });
          });
      })
      .catch(error => {
        console.log('Failure to create bike ' + error),
          res.json({
            errors: Object.keys(error.errors).map(
              key => error.errors[key].message
            ),
          });
      });
    // User.findByIdAndUpdate({ _id: req.session.user })
    //   .then(user => {
    //     let myuser = user;
    //     console.log('Did we get the user? ' + myuser);
    //     console.log(myuser);
    //     let new_bike = new Bike({
    //       userid: req.session.user,
    //       title: req.body.title,
    //       description: req.body.description,
    //       price: req.body.price,
    //       location: req.body.location,
    //       url: req.body.url,
    //     });
    //     console.log('user bikes: ', myuser.bikes);
    //     myuser.bikes.push(new_bike);
    //     new_bike
    //       .save()
    //       .then(() => {
    //         myuser.save();
    //         console.log('Bike created');
    //         res.json(true);
    //       })
    //       .catch(err => {
    //         res.status(400);
    //         res.json(false);
    //       });
    //   })
    //   .catch(err => {
    //     res.status(400);
    //     res.json(false);
    //   });
  },
  // Update a bike
  update(req, res) {
    const { bike_id: bikeId } = req.params;
    Bike.findByIdAndUpdate(bikeId, req.body, { new: true })
      .then(bike => res.json(bike))
      .catch(error => {
        const errors = Object.keys(error.errors).map(
          key => error.errors[key].message
        );

        res.status(Http.UnprocessableEntity).json(errors);
      });
  },
  // Delete bike
  destroy(req, res) {
    Bike.findByIdAndRemove({ _id: req.body.id })
      .then(bike => res.json(bike))
      .catch(error => res.status(Http.InternalServerError).json(error));
  },
};
