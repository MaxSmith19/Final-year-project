const express = require("express")
const router = express.Router()
const {
    getSocials,
    generatePKCE,
    etsyCallback
} = require("../controllers/socialMediaController")
    //import all functions from the controllers file

const { protect} = require("../middleware/authMiddleware")
//Get the JWT protect function from the auth middleware file
router.route('/get').get( protect, getSocials)
router.route("/PKCE").get(generatePKCE)
router.route("/etsyCallback").get(etsyCallback)
// router.route("/etsy/oAuth").post(oAuthEtsy)
//Each of these show the associated subdirectory for the function.
//So, if we want to register a user, we add a / at the end of the url 

module.exports = router