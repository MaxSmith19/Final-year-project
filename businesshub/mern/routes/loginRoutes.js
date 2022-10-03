const express = require("express")
const router = express.Router()
const {
    getLogin,
    setLogin,
    updateLogin,
    deleteLogin,
    } = require('../controllers/loginController')

router.route('/').get(getLogin).post(setLogin)

router.route('/:id').put(updateLogin).delete(deleteLogin)


module.exports = router