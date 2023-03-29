const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {decodeJWT, generateToken} = require("../middleware/authMiddleware")
const Social = require("../models/socialMediaModel")

const getSocials = asyncHandler(async (req, res) => {
    const token=decodeJWT(req,res)
    //use the decode function from AuthMiddleware to decode the token
    const Socials = await Social.find({_id: token.id})
    //recieve the users data using the token id, without their password being shown
    res.status(200).json(Users)
    // OK - Sending the data back to the client
  })
const registerSocials = asyncHandler(async (req, res) => {
    const token = decodeJWT(req,res)
    const Socials = await Social.create({
        userID: token.id,
        etsyOAUTH: req.params.eOAuth
    })
    res.status(200).json(socials)
})
const updateSocials = asyncHandler(async (req, res) => {
    const token = decodeJWT(req, res)
    const Socials = await Social.updateOne()

})
module.exports ={
    getSocials,
    registerSocials

}