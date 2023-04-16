const express = require("express");
const router = express.Router();
const { createTicket, getTickets, removeTicket } = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware");

router.route('/create').post(createTicket);
router.route('/get').get(getTickets);
router.route('/remove').delete(removeTicket);

module.exports = router;
