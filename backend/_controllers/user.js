const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../_models/User");

exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
    .then(hash => {

        const user = new User({
            email: req.body.email,
            password: hash
        })

        user.save()
        .then(() => res.status(201).json({ message: "Nouveau utilisateur ajouté."}))
        .catch(error => {
            console.log("Error on exports.signup 2 : " + error );
            res.status(400).json( "Une erreur s'est produite lors de la création d'un utilisateur");
        });

    })
    .catch(error => {
        console.log("Error on exports.signup 1 : " + error );
        res.status(500).json( "Une erreur s'est produite lors de la création d'un utilisateur");
    });

};

exports.login = (req, res, next) => {

    User.findOne({email: req.body.email})
    .then(user => {
        if(user === null){

            res.status(401).json({ message: "L'email ou le mot de passe est incorrect."});

        } else {

            bcrypt.compare(req.body.password, user.password)
            .then(valid => {

                if(!valid){

                    res.status(401).json({ message: "L'email ou le mot de passe est incorrect."})

                } else {

                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.random_secret_token,
                            {expiresIn:"24h"}
                        )
                    });

                }
            })
            .catch(error => {
                console.log("Error on exports.login 2 : " + error );
                res.status(500).json( "Une erreur s'est produite lors de la connexion d'un utilisateur");
            });

        }
    })
    .catch(error => {
        console.log("Error on exports.login 1 : " + error );
        res.status(500).json( "Une erreur s'est produite lors de la connexion d'un utilisateur");
    });

};