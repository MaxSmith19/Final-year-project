const express = require("express")
const router = express.Router()
const {
    getUser,
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    } = require('../controllers/accountsController')

router.route('/').get(getAccount).post(registerUser)
router.route('/acounts/').post(loginUser);
router.route('/:id').put(updateUser).delete(deleteUser)


module.exports = router