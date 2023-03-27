const express = require("express")
const router = express.Router()
const {
    getUser,
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    } = require('../controllers/UserController')
    //import all functions from the controllers file

const { protect} = require("../middleware/authMiddleware")
//Get the JWT protect function from the auth middleware file
router.route('/').post(registerUser)
router.get('/get', protect, getUser)
router.route('/login/').post(loginUser);
router.route('/update').put(protect,updateUser)
router.route("/del").delete(protect,deleteUser)
//Each of these show the associated subdirectory for the function.
//So, if we want to register a user, we add a / at the end of the url 

module.exports = router