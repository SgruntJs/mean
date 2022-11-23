const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log('req headers', req.headers);
    const token = req.headers.authorization.split(' ')[1];
    console.log('token is ', token);
    if(!token) {
        res.status(403).send("A token is required for authentication");
    } else {
        // try{
        //     const decodedToken = jwt.verify(token, secretKey);
        //     req.decodedToken = decodedToken
        // } catch {
        //     res.json({ status: 'error', data: 'Invalid Token'})
        // }
        jwt.verify(token, secretKey,  (err, decodedToken) => {
            if(!err) {
                req.decodedToken = decodedToken;
            } else if(err){
                res.staus(403).send(err)  
            }
        })
    }
    return next();
}

module.exports = verifyToken;