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
router.route('/update').put(protect,updateLedger)
router.route('delete').delete(deleteLedger)


module.exports = router