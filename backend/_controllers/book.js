const Book = require("../_models/Book");
const fs = require("fs");
const multer = require("../_middlewares/multer");

exports.getAllBooks = (req, res, next) => {

    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json( error ));

};

exports.getOneBook = (req, res, next) => {

    Book.findOne({ _id: req.params.id})
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json( error ));

};

exports.getBestRating = (req, res, next) => {

    Book.find()
    .sort({averageRating: -1})
    .limit(3)
    .then(allBooks => res.status(200).json( allBooks ))
    .catch(error => res.status(400).json( error ));

};

exports.createBook = async (req, res, next) => {

    const dto = JSON.parse(req.body.book);

    delete dto._id;
    dto.userId = req.auth.userId;

    if (req.file != undefined) {

        let filename = await multer.createImage(req.file);
        dto.imageUrl = `${req.protocol}://${req.get("host")}/booksImages/${filename}`;
    }

    let book = new Book ({

        ...dto,
        ratings: [],
        averageRating: 0

    })

    if (dto.ratings[0].grade > 0) {

        book.ratings.push({
            userId: req.auth.userId,
            rating: dto.ratings[0].rating
        })

        book.averageRating = book.ratings[0].rating
    }
    
    book.save()
    .then(() => res.status(201).json({ message: "Livre ajouté à la base de donnée."}))
    .catch(error => res.status(400).json( error ));

};

exports.modifyBook = (req, res, next) => {

    Book.findOne({ _id: req.params.id })
    .then( async (book) => {

        if ( book.userId !== req.auth.userId ) {

            res.status(401).json({ message: "Vous ne disposez pas des droits pour effectuer cette action."});

        }

        let dto = null;

        if (req.file === undefined){
            
            dto = { ...req.body };

        } else {

            let filename = await multer.createImage(req.file); 
            dto = JSON.parse(req.body.book);
            dto.imageUrl = `${req.protocol}://${req.get("host")}/booksImages/${filename}`;

        }

        book.title = dto.title;
        book.author = dto.author;
        book.year = dto.year;
        book.genre = dto.genre;
    
        if (dto.imageUrl !== undefined) {

            // On supprime toujours l'ancienne image
            // La configuration multer ajoute un timestamp, donc on a toujours une nouvelle image
            if(book.imageUrl !== undefined){

                let oldImage = book.imageUrl.split("/booksImages/")[1];
                fs.unlinkSync(`_images/booksImages/${oldImage}`);
            }

            book.imageUrl = dto.imageUrl;
        }

        Book.updateOne({ _id: book._id}, book)
        .then(() => res.status(200).json({ message: "Livre mis à jour."}))
        .catch(error => res.status(400).json( error ));
        
    })
    .catch(error => res.status(400).json( error ))

};

exports.deleteBook = (req, res, next) => {

    Book.findOne({ _id: req.params.id })
    .then(book => {

        if (book.userId !== req.auth.userId){

            res.status(401).json({ message: "Vous n'êtes pas autorisé à faire cette action."});

        }

        const filename = book.imageUrl.split("/booksImages/")[1];

        fs.unlinkSync(`_images/booksImages/${filename}`)

        Book.deleteOne({ _id: book._id })
        .then(() => res.status(200).json({ message: "Livre supprimé."}))
        .catch(error => res.status(401).json( error ));
        
    })
    .catch(error => res.status(500).json( error ));

};

exports.addBookRating = (req, res, next) => {

    Book.findOne({ _id: req.params.id})
    .then(book => {

        book.ratins.forEach(aRating => { 
        if (aRating.userId === req.body.userId) {

            res.status(401).json({ message : "Vous avez déjà noté ce livre."});

        }})

        let rating = {

            userId: req.auth.userId,
            rating: req.body.rating

        };

        book.ratings.push(rating)

        let somme = 0;
        book.ratings.forEach(aRating => {
            somme += aRating.rating;
        });

        book.averageRating = Number(somme / book.rating.length).toFixed(1);

        Book.updateOne({ _id: book._id},{
            $push:{ratings: [rating]},
            averageRating: book.averageRating
        })
        .then(result => res.status(201).json( book ))
        .catch(error => res.status(401).json( error ));

    })
    .catch( error => res.status(400).json( error ));

};