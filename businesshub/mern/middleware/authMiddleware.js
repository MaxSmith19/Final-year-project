const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require("../models/UserModel");

const protect = asyncHandler(async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        // Bearer <token> is the format, so we must check that the header starts with "Bearer"
        try{
            token = req.headers.authorization.split(' ')[1]
            //split token into an array so it is easy to get the token/
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //verify the token

            req.user = await User.findById(decoded.id).select('-password')
            //return the user without their password
            next()

        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error('Invalid token')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('No token, authorization denied')
    } 
    })

const decodeJWT = (req, res) => {
    let token = req.headers.authorization.split(" ")[1]
    if(token===null){
       token= req.cookies.token
    }
    console.log(token)
    return decoded=jwt.verify(token, process.env.JWT_SECRET);
}
    //for generating jwt tokens for authentication
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    })
}


module.exports={
    protect,
    decodeJWT,
    generateToken
}