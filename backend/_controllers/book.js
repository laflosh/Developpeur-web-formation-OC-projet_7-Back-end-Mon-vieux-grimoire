const Book = require("../_models/Book");

exports.getAllBooks = (req, res, next) => {

    Book.find()
    .then(books => res.status(200).json({ books }))
    .catch(error => res.status(400).json({ error }));

};

exports.getOneBook = (req, res, next) => {

    Book.findOne({ _id: req.params.id})
    .then(book => res.status(200).json({ book }))
    .catch(error => res.status(404).json({ error }));

};

exports.createBook = (req, res, next) => {

    const bookObject = req.body;
    console.log(bookObject)

};