const Cake = require('mongoose').model('Cake');
const { Http } = require('@status/codes');
// enum writen representation and status

module.exports = {
  index(req, res) {
    console.log('We got the index');
    // get all resource (cakes)
    Cake.find({})
      .then(cake => res.json({ cakes: cake }))
      .catch(error => res.status(Http.MovedPermanently).json(error));
  },
  show(req, res) {
    //get one resource
    // console.log('We got the one cake');
    Cake.findById(req.params.id)
      .then(data => res.json({ cake: data }))
      .catch(err => res.json({ message: 'Create Cake Error', error: err }));
  },
  create(req, res) {
    randId = Math.floor(Math.random() * 1000);
    var cake = new Cake({
      _id: randId,
      baker_name: req.body.bakerName,
      image_url: req.body.imageUrl
    });
    // console.log(req.body);
    cake
      .save()
      .then(cake => res.json({ message: 'Cake Created', info: info }))
      .catch(err => res.json({ message: 'Create Cake Error', error: err }));
  },
  rate(req, res) {
    // update resource
    Cake.findOneAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
      context: 'query',
    })
      .then(cake => res.json({ message: 'Cake Created', info: cake }))
      .catch(err => res.json({ message: 'Create Cake Error', error: err }));
  },
  destroy(req, res) {
    // delete resource
    Cake.findByIdAndRemove(req.params.id)
      .then(cake => res.json({ message: 'Cake Deleted', info: cake }))
      .catch(err => res.json({ message: 'Delete Cake Error', error: err }));
  },
};
