const express = require("express")
const router = express.Router()
const {protect} = require("../middleware/authMiddleware")
const {
    getInventory,
    createInventory,
    updateInventory,
    deleteInventory,
    } = require('../controllers/inventoryController')

router.route('/').get(protect,getInventory).post(createInventory)
router.route('/update').put(protect,updateInventory)
router.route('/delete').delete(deleteInventory)


module.exports = router