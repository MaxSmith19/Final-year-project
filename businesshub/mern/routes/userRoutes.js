const express = require("express")
const router = express.Router()
const {
    getUser,
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    } = require('../controllers/UserController')
const { protect} = require("../middleware/authMiddleware")

router.route('/').post(registerUser)
router.get('/get', protect, getUser)
router.route('/login/').post(loginUser);
router.route('/:id').put(updateUser).delete(deleteUser)


module.exports = router