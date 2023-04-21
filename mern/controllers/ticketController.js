const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const {decodeJWT, generateToken} = require("../middleware/authMiddleware")

//@ROUTE POST /create
//@HEADER Authorization- the users bearer token
//Creates a bug ticket to be uploaded to the database
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
//@ROUTE GET /get
//Returns all tickets currently held in the database
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find();

  res.status(200).json({ tickets });
});
//@ROUTE DELETE /remove
//Returns a ticket currently held in the database
const removeTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findByIdAndDelete(req.body._id)
  res.status(200).json({ ticket });
});
module.exports = { createTicket, getTickets, removeTicket };
