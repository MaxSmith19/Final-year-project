const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const {decodeJWT, generateToken} = require("../middleware/authMiddleware")

const createTicket = asyncHandler(async (req, res) => {
  const token=decodeJWT(req,res)


  if (!req.body.title || !req.body.description) {
    res.status(400).json({ message: "Please provide title and description" });
    return;
  }

  const newTicket = await Ticket.create({
    userID: token.id,
    title:req.body.title,
    description: req.body.description
  });

  res.status(201).json("Ticket successfully created")
});

const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find();

  res.status(200).json({ tickets });
});

module.exports = { createTicket, getTickets };
