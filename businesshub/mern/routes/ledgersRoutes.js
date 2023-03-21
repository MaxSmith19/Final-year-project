const express = require("express")
const router = express.Router()
const {protect} = require("../middleware/authMiddleware")
const {
    getLedger,
    createLedger,
    updateLedger,
    deleteLedger,
    } = require('../controllers/ledgersController')

router.route('/').get(protect,getLedger).post(createLedger)
router.route('/:id').put(protect,updateLedger).delete(deleteLedger)


module.exports = router