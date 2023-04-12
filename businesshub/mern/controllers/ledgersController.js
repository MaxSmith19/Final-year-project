const asyncHandler = require("express-async-handler")

const Ledger = require("../models/LedgersModel")
const {decodeJWT, generateJWT} = require("../middleware/authMiddleware")

const getLedger = asyncHandler(async (req, res) => {
    const token = decodeJWT(req,res)
    const params = req.body.ledgerName
    let Ledgers = {}
    if(params !== undefined){
      Ledgers = await Ledger.find({
        userID: token.id,
        ledgerName: req.body.ledgerName
      });
    }else{
      Ledgers = await Ledger.find({
        userID: token.id
      });
    }
    res.status(200).json(Ledgers)
    //differerent to how getUser works as we need all ledgers of one use
  })


const createLedger = asyncHandler(async(req, res) =>{
  const token = decodeJWT(req,res)
  const ledger = await Ledger.create({
    userID: token.id,
    ledgerName: req.body.ledgerName,
    ledgerData: [{date: "", notes: "", debit: 0, credit: 0, balance: 0}]
    //start the ledger with a blank row
  })
  res.status(201).json(ledger)
})

const updateLedger = asyncHandler(async(req, res) =>{
  const token = decodeJWT(req,res)
  const ledgerID = req.body._id
  if(req.body.ledgerName!== undefined){
    //if the ledger name is also changed
    const Ledgers = await Ledger.findByIdAndUpdate(ledgerID, 
      {ledgerName: req.body.ledgerName,
         ledgerData: req.body.ledgerData
        }, {new: true})
    res.status(201).json(Ledgers)
  }else{
    const Ledgers = await Ledger.findByIdAndUpdate(ledgerID, 
      {ledgerData: req.body.ledgerData
      }, {new: true})
    res.status(201).json(Ledgers)
  }
  
})
 
const deleteLedger = asyncHandler(async(req, res) =>{
  const ledgerID = req.body._id
  const Ledgers = await Ledger.findByIdAndDelete(ledgerID)  
  res.status(201).json(Ledgers)
})

module.exports ={
    getLedger,
    createLedger,
    updateLedger,
    deleteLedger
}