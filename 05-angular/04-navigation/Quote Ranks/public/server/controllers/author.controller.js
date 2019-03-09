const Author = require('mongoose').model('Author');
const { Http } = require('@status/codes');
// enum writen representation and status

module.exports = {
  index(req, res) {
    console.log('We got the index');
    // get all resource (authors)
    Author.find({})
      .then(author => res.json({ authors: author }))
      .catch(error => res.status(Http.MovedPermanently).json(error));
  },
  show(req, res) {
    //get one resource
    // console.log('We got the one author');
    Author.findById(req.params.id)
      .then(data => res.json({ author: data }))
      .catch(err => res.json({ message: 'Create Author Error', error: err }));
  },
  create(req, res) {
    randId = Math.floor(Math.random() * 1000);
    var author = new Author({
      _id: randId,
      name: req.body.name,
      quotes: [],
    });
    console.log(req.body);
    author
      .save()
      .then(data => res.json({ message: 'Author Created', author: data }))
      .catch(err => res.json({ message: 'Create Author Error', error: err }));
  },
  update(req, res) {
    // update resource
    randId = Math.floor(Math.random() * 1000);
    Author.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          quotes: {
            _id: randId,
            content: req.body.content,
            votes: 0,
          },
        },
      },
      {
        runValidators: true,
        context: 'query',
      }
    )
      .then(quote => res.json({ message: 'Quote created', info: quote }))
      .catch(err => res.json({ message: 'Create Quote Error!: ', error: err }));
  },
  editAuthor(req, res) {
    // update resource
    Author.findOneAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
      context: 'query',
    })
      .then(author => res.json({ message: 'Author Editted', info: author }))
      .catch(err => res.json({ message: 'Edit Author Error', error: err }));
  },
  quoteUpdate(req, res) {
    // update quote votes
    Author.findOneAndUpdate(
      { _id: req.params.id, 'quotes._id': req.body._id },
      { $set: { 'quotes.$.votes': req.body.votes } },
      {
        runValidators: true,
        context: 'query',
      }
    )
      .then(author => res.json({ message: 'Vote for quote', info: author }))
      .catch(err =>
        res.json({ message: 'Vote could not be made', error: err })
      );
  },
  destroy(req, res) {
    // delete resource
    // console.log('Are we here? Quote id: ' + JSON.stringify(req.params.id));
    // console.log('Are we here for auth id? ' + JSON.stringify(req.body._id));
    Author.findByIdAndUpdate(
      { _id: req.body._id },
      { $pull: { quotes: { _id: req.params.id } } }
    )
      .then(quote => res.json({ message: 'Delete quote', info: quote }))
      .catch(err => res.json({ message: 'Could not delete', error: err }));
  },
};
