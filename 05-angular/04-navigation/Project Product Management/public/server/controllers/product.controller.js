const Product = require('mongoose').model('Product');
const { Http } = require('@status/codes');
// enum writen representation and status

module.exports = {
  index(req, res) {
    console.log('We got the index');
    // get all resource (products)
    Product.find({})
      .then(product => res.json({ products: product }))
      .catch(error => res.status(Http.MovedPermanently).json(error));
  },
  show(req, res) {
    //get one resource
    // console.log('We got the one product');
    Product.findById(req.params.id)
      .then(data => res.json({ product: data }))
      .catch(err => res.json({ message: 'Create Product Error', error: err }));
  },
  create(req, res) {
    randId = Math.floor(Math.random() * 1000);
    var product = new Product({
      _id: randId,
      title: req.body.title,
      price: req.body.price,
      url: req.body.url,
    });
    console.log(req.body);
    product
      .save()
      .then(data => res.json({ message: 'Product Created', product: data }))
      .catch(err => res.json({ message: 'Create Product Error', error: err }));
  },
  update(req, res) {
    // update resource
    Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
      context: 'query',
    })
      .then(product => res.json({ message: 'Product Created', info: product }))
      .catch(err => res.json({ message: 'Create Product Error', error: err }));
  },
  destroy(req, res) {
    // delete resource
    Product.findOneAndDelete({ _id: req.params.id })
      .then(product => res.json({ message: 'Product Deleted', info: product }))
      .catch(err => res.json({ message: 'Delete Product Error', error: err }));
  },
};
