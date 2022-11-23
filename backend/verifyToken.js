const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log('req headers', req.headers);
    const token = req.headers['authorization'];
    console.log('token is ', token);
    if(!token) {
        res.status(403).send("A token is required for authentication");
    } else {
        try{
            const decodedToken = jwt.verify(token, secretKey);
            req.decodedToken = decodedToken
        } catch {
            res.json({ status: 'error', data: 'Something went wrong'})
        }
    }
    return next();
}

module.exports = verifyToken;