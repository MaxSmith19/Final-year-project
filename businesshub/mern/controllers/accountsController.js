const asyncHandler = require("express-async-handler")

const Account = require("../models/AccountsModel")

const getAccount = asyncHandler(async (req, res) => {
    const Accounts = await Account.find();
    res.status(200).json(Accounts)
  })


//REGISTERS Account, ADDS DATA INTO MONGO
const registerAccount = asyncHandler(async(req, res) =>{
})

const updateAccount = asyncHandler(async( req, res) =>{
})
 
const deleteAccount = asyncHandler(async(req, res) =>{
})

module.exports ={
    getAccount,
    registerAccount,
    updateAccount,
    deleteAccount
}