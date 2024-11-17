const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const verifyToken = (req, res, next) => {

 let token;
 const authHeader = req.headers.authorization || req.headers.Authorization;
 if(authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({
            message : 'No Token, authorization denied'
        });
    }

     try {
           const decode = jwt.verify(token, process.env.JWT_SECRET);
           req.user = decode;
           console.log('the decoded user is', req.user);
           next()
     } catch (error) {
        return res.status(400).json({
            message : 'Token is not valid',
        });
     }

 }

}

module.exports = verifyToken