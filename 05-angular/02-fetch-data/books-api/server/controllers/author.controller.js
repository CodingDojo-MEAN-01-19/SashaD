const Author = require('mongoose').model('Author');
const { Http } = require('@status/codes');
// enum writen representation and status
module.exports = {
  index(req, res) {
    console.log('We got the index');
    // get all resource (Authors)
    Author.find({})
      .then(authors => res.json(authors))
      .catch(error => res.status(Http.MovedPermanently).json(error));
  },
  show(req, res) {
    console.log('We found that author!');
    const { author_id: AuthorId } = req.params;
    //get one resource
    Author.findById(AuthorId)
      .then(author => res.json(author))
      .catch(error => res.status(Http.MovedPermanently).json(error));
  },
  create(req, res) {
    // create resource
    Author.create(req.body)
      .then(author => res.json(author))
      .catch(error => {
        const errors = Object.keys(error.erros).map(
          key => error.errors(key).message
        );
        res.status(Http.UnprocessableEntity).json(errors);
      });
  },
  createBook(req, res) {
    console.log(req.body);
    const objbook = req.body;
    // create book under an author
    const { author_id: AuthorId } = req.params;
    Author.findOneAndUpdate(
      AuthorId,
      { $push: { books: objbook } },
      { new: true }
    )
      .then(author => res.json(author))
      .catch(error => {
        const errors = Object.keys(error.erros).map(
          key => error.errors(key).message
        );
        res.status(Http.UnprocessableEntity).json(errors);
      });
  },
  update(req, res) {
    const { author_id: AuthorId } = request.params;
    // update resource
    Author.findByIdAndUpdate(AuthorId, req.body, { new: true })
      .then(author => res.json(author))
      .catch(error => {
        const errors = Object.keys(error.erros).map(
          key => error.errors(key).message
        );
        res.status(Http.UnprocessableEntity).json(errors);
      });
  },
  destroy(req, res) {
    // delete resource
    const { author_id: AuthorId } = req.params;
    Author.findByIdAndRemove(AuthorId)
      .then(author => res.json(author))
      .catch(error => {
        const errors = Object.keys(error.erros).map(
          key => error.errors(key).message
        );
        res.status(Http.UnprocessableEntity).json(errors);
      });
  },
};
