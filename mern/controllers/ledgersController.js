const asyncHandler = require("express-async-handler")

const Ledger = require("../models/ledgersModel")
const {decodeJWT, generateJWT} = require("../middleware/authMiddleware")

//@ROUTE GET /
//@HEADER Authorization- the users bearer token
//Returns authorised users ledgers
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

//@ROUTE POST /
//@HEADER Authorization- the users bearer token
//Creates a new ledger for the authorised user
  const createLedger = asyncHandler(async(req, res) =>{
    try{
      if(req.headers.Authorization!==""){
        const token = decodeJWT(req,res)
        const ledger = await Ledger.create({
          userID: token.id,
          ledgerName: req.body && req.body.ledgerName ? req.body.ledgerName : "New Ledger",
          ledgerData: [{date: "", notes: "", debit: 0, credit: 0}],
          balance: req.body && req.body.balance ? req.body.balance : 0,

          //start the ledger with a blank row
        })
        res.status(201).json(ledger)
      }else{
        res.status(401).json({error: "Unauthorized to create ledger"})
      }
    }catch(error){
      console.log(error)
      res.status(401).json({error: "Unauthorized to create ledger"})
    }
  })
  
  
  
//@ROUTE PUT /update
//@HEADER Authorization- the users bearer token
//Updates the authorised users token given the ID
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
//@ROUTE DELETE /delete
//@HEADER Authorization- the users bearer token
//Deletes the given ledger from the database
const deleteLedger = asyncHandler(async(req, res, next) => {
  const ledgerID = req.body._id
  try {
    const Ledgers = await Ledger.findByIdAndDelete(ledgerID)
    if (!Ledgers) {
      res.status(404).json({message: "Ledger not found" })
    }
    res.status(201).json(Ledgers)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


module.exports ={
    getLedger,
    createLedger,
    updateLedger,
    deleteLedger
}