const express = require("express");
const router = express.Router();
const { createTicket } = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware");

router.post('/create', createTicket);

module.exports = router;
