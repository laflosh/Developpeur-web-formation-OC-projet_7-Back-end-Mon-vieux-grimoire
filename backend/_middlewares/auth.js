const jwt = require("jsonwebtoken");

module.exports = (req ,res ,next ) => {

    try {

        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.random_secret_token );
        const userId = decodedToken.userId;

        req.auth = {
            userId: userId
        }

        next();

    } catch (error) {

        console.log("Error on auth : " + error );
        res.status(401).json( "Une erreur s'est produite lors de l'authentification");
        
    };

};