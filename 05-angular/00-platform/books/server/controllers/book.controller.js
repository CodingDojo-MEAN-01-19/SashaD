const Book = require('mongoose').model('Book');
const { Http } = require('@status/codes');
// enum writen representation and status
module.exports = {
	index(req, res) {
		// get all resource (books)
		Book.find({})
			.then(books => res.json(books))
			.catch(error => res.status(Http.MovedPermanently).json(error));
	},
	show(req, res) {
		const { book_id: bookId } = request.params;
		//get one resource
		Book.findById(bookId)
			.then(book => res.json(book))
			.catch(error => res.status(Http.MovedPermanently).json(error));
	},
	create(req, res) {
		// create resource
		Book.create(req.body)
			.then(book => res.json(book))
			.catch(error => {
				const errors = Object.keys(error.erros).map(
					key => error.errors(key).message
				);
				res.status(Http.UnprocessableEntity).json(errors);
			});
	},
	update(req, res) {
		const { book_id: bookId } = request.params;
		// update resource
		Book.findByIdAndUpdate(bookId, req.body, { new: true })
			.then(book => res.json(book))
			.catch(error => {
				const errors = Object.keys(error.erros).map(
					key => error.errors(key).message
				);
				res.status(Http.UnprocessableEntity).json(errors);
			});
	},
	destroy(req, res) {
		// delete resource
		const { book_id: bookId } = req.params;
		Book.findByIdAndRemove(bookId)
			.then(book => res.json(book))
			.catch(error => {
				const errors = Object.keys(error.erros).map(
					key => error.errors(key).message
				);
				res.status(Http.UnprocessableEntity).json(errors);
			});
	},
};
