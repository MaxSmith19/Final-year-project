const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {decodeJWT, generateToken} = require("../middleware/authMiddleware")
const Social = require("../models/socialMediaModel")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// const crypto = require("crypto")

// const oAuthEtsy = asyncHandler(async (req, res) =>{
//     const authCode = req.query.code;
//     const tokenUrl = 'https://api.etsy.com/v3/public/oauth/token';

//     const base64URLEncode = (str) =>
//     str
//       .toString("base64")
//       .replace(/\+/g, "-")
//       .replace(/\//g, "_")
//       .replace(/=/g, "");
  
//     const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest();
    
//     // We’ll use the verifier to generate the challenge.
//     // The verifier needs to be saved for a future step in the OAuth flow.
//     const codeVerifier = base64URLEncode(crypto.randomBytes(32));
    
//     // With these functions, we can generate
//     // the values needed for our OAuth authorization grant.
//     const codeChallenge = base64URLEncode(sha256(codeVerifier));
//     const state = Math.random().toString(36).substring(7);
  
//     const requestOptions = {
//         method: 'POST',
//         body: JSON.stringify({
//             grant_type: 'authorization_code',
//             client_id: process.env.ETSY_KEYSTRING,
//             redirect_uri: redirectUri,
//             code: authCode,
//             code_verifier: clientVerifier,
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };

//     const response = await fetch(tokenUrl, requestOptions);

//     // Extract the access token from the response access_token data field
//     if (response.ok) {
//         const tokenData = await response.json();
//         res.send(tokenData);
//     } else {
//         res.send("oops");
//     }
// })

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
        res.send("API KEY INVALID OR UNDEFINED");
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