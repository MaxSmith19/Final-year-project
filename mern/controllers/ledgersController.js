const asyncHandler = require("express-async-handler")

const Ledger = require("../models/ledgersModel")
const {decodeJWT, generateJWT} = require("../middleware/authMiddleware")

const getLedger = asyncHandler(async (req, res) => {
    const token = decodeJWT(req,res)
    const params = req.body.ledgerName
    
    let Ledgers = {}
    if(params !== undefined){
      Ledgers = await Ledger.findOne({
        userID: token.id,
        ledgerName: req.body.ledgerName
        //if a ledger name is specified, only retrieve that ledger
      });
    }else{
      Ledgers = await Ledger.find({
        userID: token.id
        //else use "find" to retrive all ledger names
      });
    }
    res.status(200).json(Ledgers)
    
  })


const createLedger = asyncHandler(async(req, res) =>{
  const token = decodeJWT(req,res)
  const ledger = await Ledger.create({
    userID: token.id,
    ledgerName: req.body.ledgerName,
    ledgerData: [{date: "", notes: "", debit: 0, credit: 0}],
    balance: req.body.balance || 0
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
         ledgerData: req.body.ledgerData,
         balance: req.body.balance
        }, {new: true})
    res.status(201).json(Ledgers)
  }else{
    const Ledgers = await Ledger.findByIdAndUpdate(ledgerID, 
      {ledgerData: req.body.ledgerData,
        balance: req.body.balance
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