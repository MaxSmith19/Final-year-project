const asyncHandler = require("express-async-handler")

const Account = require("../models/AccountsModel")

const getAccount = asyncHandler(async (req, res) => {
    const id = req.body.id
    const Accounts = await Account.find({userID: id});
    res.status(200).json(Accounts)
    //differerent to how getUser works as we need all accounts of one use
  })


const createAccount = asyncHandler(async(req, res) =>{
  const account = await Account.create({
    userID: req.body.userID,
    accountName: req.body.accountName,
    accountData: req.body.accountData
  })
  res.status(201).json(account)
})

const updateAccount = asyncHandler(async( req, res) =>{
  const Account = await Account.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(201).json(Account)
})
 
const deleteAccount = asyncHandler(async(req, res) =>{
  const Account = await Account.findByIdAndDelete(req.params.id)
  res.status(201).json({message: "Account deleted"})
})

module.exports ={
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount
}