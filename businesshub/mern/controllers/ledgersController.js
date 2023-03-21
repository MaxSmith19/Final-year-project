const asyncHandler = require("express-async-handler")

const Ledger = require("../models/LedgersModel")

const getLedger = asyncHandler(async (req, res) => {
    const id = req.body.id
    const Ledgers = await Ledger.find({userID: id});
    res.status(200).json(Ledgers)
    //differerent to how getUser works as we need all ledgers of one use
  })


const createLedger = asyncHandler(async(req, res) =>{
  const ledger = await Ledger.create({
    userID: req.body.userID,
    ledgerName: req.body.ledgerName,
    ledgerData: req.body.ledgerData
  })
  res.status(201).json(ledger)
})

const updateLedger = asyncHandler(async( req, res) =>{
  const Ledger = await Ledger.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(201).json(Ledger)
})
 
const deleteLedger = asyncHandler(async(req, res) =>{
  const Ledger = await Ledger.findByIdAndDelete(req.params.id)
  res.status(201).json({message: "Ledger deleted"})
})

module.exports ={
    getLedger,
    createLedger,
    updateLedger,
    deleteLedger
}