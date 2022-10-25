const express = require("express")
const router = express.Router()
const {
    getUser,
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    } = require('../controllers/UserController')

router.route('/').get(getUser).post(registerUser)
router.route('/login/').get(loginUser);
router.route('/:id').put(updateUser).delete(deleteUser)


module.exports = router