const express = require("express")
const router = express.Router()
const {
    loginAdmin,
    createAdmin,
    } = require('../controllers/AdminController')

router.route('/A').post(createAdmin).get(loginAdmin);



module.exports = router