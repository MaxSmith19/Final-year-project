const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");

const createTicket = asyncHandler(async (req, res) => {
  const token=decodeJWT(req,res)


  if (!title || !description) {
    res.status(400).json({ message: "Please provide title and description" });
    return;
  }

  const newTicket = await Ticket.create({
    title:req.body.title,
    description: req.body.description,
    user: token.id,
  });

  res.status(201).json({ message: "Ticket created", ticket: newTicket });
});

const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({}).populate("user", "email");

  res.status(200).json({ tickets });
});

module.exports = { createTicket, getTickets };
