const express = require("express")
const router = express.Router()
const {
    getLedger,
    createLedger,
    updateLedger,
    deleteLedger,
    } = require('../controllers/ledgersController')

router.route('/').get(getLedger).post(createLedger)
router.route('/:id').put(updateLedger).delete(deleteLedger)


module.exports = router