const express = require("express")
const router = express.Router()
const {
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount,
    } = require('../controllers/accountsController')

router.route('/').get(getAccount).post(createAccount)
router.route('/:id').put(updateAccount).delete(deleteAccount)


module.exports = router