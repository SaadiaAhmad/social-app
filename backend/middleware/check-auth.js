const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
    //The authorization tokens are generally added to the authorization header like 
    //"Bearer lhflehfkgdbxljwqbbfhnwebhbfc" where the first part is just the keyword Bearer 
    //and the second part is the token - this is simply a convention
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'secret_which_is_my_secret_and_should_be_longer_than_this');
    next();
    } catch (err) {
        res.status(401).json({
            message: 'Unauthorized!'
        })
    }

}