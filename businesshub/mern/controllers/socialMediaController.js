const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {decodeJWT, generateToken} = require("../middleware/authMiddleware")
const Social = require("../models/socialMediaModel")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));



const pingEtsy = asyncHandler(async (req, res) => {
    const requestOptions = {
        'method': 'GET',
        'headers': {
            'x-api-key': process.env.ETSY_KEYSTRING,
        },
    };

    const response = await fetch(
        'https://api.etsy.com/v3/application/openapi-ping',
        requestOptions
    );

    if (response.ok) {
        const data = await response.json();
        res.send(data);
    } else {
        res.send("oops");
    }
})
const getSocials = asyncHandler(async (req, res) => {
    const token=decodeJWT(req,res)

    const Socials = await Social.findOne({userID: token.id})
    res.status(200).json(Socials)
  })
const registerSocials = asyncHandler(async (req, res) => {
    const token = decodeJWT(req,res)
    const Socials = await Social.create({
        userID: token.id,
        etsyOAUTH: req.params.eOAuth
    })
    res.status(200).json(Socials)
})
const updateSocials = asyncHandler(async (req, res) => {
    const token = decodeJWT(req, res)
    const Socials = await Social.updateOne()

})
module.exports ={
    pingEtsy,
    getSocials,
    registerSocials

}