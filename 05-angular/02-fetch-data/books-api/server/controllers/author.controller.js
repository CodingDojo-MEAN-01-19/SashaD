const Author = require('mongoose').model('Author');
const parser = require('body-parser');
// The error middleware
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
    let { author_id: AuthorId } = req.params;
    //get one resource
    Author.findById(AuthorId)
      .then(author => res.json(author))
      .catch(error => res.status(Http.MovedPermanently).json(error));
  },
  create(req, res) {
    // create resource
    Author.create(req.body)
      .then(author => res.json(author))
      .catch(error =>
        res.status(Http.UnprocessableEntity).json(error['message'])
      );
  },
  createBook(req, res) {
    // the nested book couldn't be edited from the mongodb
    const currentDate = new Date();
    let usableYear = currentDate.getFullYear();
    // console.log(usableYear);
    // console.log(req.body);
    const objbook = req.body;
    let time = req.body['publication_year'];
    console.log(time);
    if (
      req.body['title'] === '' ||
      req.body['title'].length <= 2 ||
      req.body['publication_year'] >= usableYear
    ) {
      res
        .status(Http.UnprocessableEntity)
        .json(
          'There is an error with your book title length or publication year'
        );
    } else {
      let { author_id: AuthorId } = req.params;
      Author.findByIdAndUpdate(
        AuthorId,
        { $addToSet: { books: objbook } },
        { new: true }
      )
        .then(author => res.json(author))
        .catch(error =>
          res.status(Http.UnprocessableEntity).json(error['message'])
        );
    }
    // create book under an author
  },
  deleteBook(req, res) {
    // console.log(req.body);
    // delete book under an author
    let { author_id: AuthorId } = req.params;
    let { book_id: BookId } = req.params;
    Author.findByIdAndUpdate(
      // Must find by id and update
      // find one was only finding the first author
      AuthorId,
      { $pull: { books: { _id: BookId } } },
      { new: true }
    )
      .then(author => res.json(author))
      .catch(error =>
        res.status(Http.UnprocessableEntity).json(error['message'])
      );
  },
  update(req, res) {
    let { author_id: AuthorId } = request.params;
    // update resource
    Author.findByIdAndUpdate(AuthorId, req.body, { new: true })
      .then(author => res.json(author))
      .catch(error =>
        res.status(Http.UnprocessableEntity).json(error['message'])
      );
  },
  destroy(req, res) {
    // delete resource
    let { author_id: AuthorId } = req.params;
    Author.findByIdAndRemove(AuthorId)
      .then(author => res.json(author))
      .catch(error =>
        res.status(Http.UnprocessableEntity).json(error['message'])
      );
  },
};
