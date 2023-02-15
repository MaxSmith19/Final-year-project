const express = require("express")
const router = express.Router()
const {
    getAccount,
    registerAccount,
    updateAccount,
    deleteAccount,
    } = require('../controllers/accountsController')

router.route('/').get(getAccount).post(registerAccount)
router.route('/:id').put(updateAccount).delete(deleteAccount)


module.exports = router