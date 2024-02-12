const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
    //The authorization tokens are generally added to the authorization header like 
    //"Bearer lhflehfkgdbxljwqbbfhnwebhbfc" where the first part is just the keyword Bearer 
    //and the second part is the token - this is simply a convention
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'secret_which_is_my_secret_and_should_be_longer_than_this');
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
    } catch (err) {
        res.status(401).json({
            error: {
                message: 'Invalid user token!',
                ...err
            }
        })
    }

}