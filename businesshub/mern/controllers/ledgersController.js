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
    ledgerData: {}
  })
  res.status(201).json(ledger)
})

const updateLedger = asyncHandler(async(req, res) =>{
  const token = decodeJWT(req,res)
  const ledgerData = req.body.ledgerData
  const ledgerID = req.body._id
  console.log(ledgerData)
  console.log(ledgerID)
  const Ledgers = await Ledger.findByIdAndUpdate(ledgerID, {ledgerData: req.body.ledgerData}, {new: true})
  res.status(201).json(Ledgers)

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