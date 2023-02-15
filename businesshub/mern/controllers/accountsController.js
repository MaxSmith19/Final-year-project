const asyncHandler = require("express-async-handler")

const Account = require("../models/AccountModel")

const getAccount = asyncHandler(async (req, res) => {
    const Accounts = await Account.find();
    res.status(200).json(Accounts)
  })

const loginAccount = asyncHandler(async(req,res) =>{
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
    loginAccount,
    registerAccount,
    updateAccount,
    deleteAccount
}