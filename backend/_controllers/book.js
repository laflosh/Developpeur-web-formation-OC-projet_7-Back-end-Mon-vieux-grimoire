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

    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;

    const book = new Book ({

        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/_images/booksImages/${req.file.filename}`,
        ratings : [],
        averageRating: 0
    });
    
    book.save()
    .then(() => res.status(201).json({ message: "Livre ajouter à la base de donnée."}))
    .catch(error => res.status(400).json({ error }));
    
};