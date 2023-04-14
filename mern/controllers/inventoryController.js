const asyncHandler = require("express-async-handler")

const Inventory = require("../models/inventoryModel")
const {decodeJWT, generateJWT} = require("../middleware/authMiddleware")

const getInventory = asyncHandler(async (req, res) => {
    const token = decodeJWT(req,res)
    const inv = await Inventory.find({
        userID: token.id
    })
    res.status(200).json(inv)
})

const createInventory = asyncHandler(async(req, res) =>{
  const token = decodeJWT(req,res)
  const check = await Inventory.findOne({userID: token.id})
  console.log(check)
    const inv = await Inventory.create({
      userID: token.id,
      inventoryData: [{Item:"",Description:"", Quantity:"", SellingPrice:""}],
      ingredientsData: [{Item:"", Description:"", Quantity: "", ppu: ""}]
    })  
    res.status(201).json(inv)
  }
)

const updateInventory = asyncHandler(async(req, res) =>{
  const token = decodeJWT(req,res)
  const id = await Inventory.findOne({userID:token.id})
  let inv=""
  console.log(req.body.inventoryData)
  inv = await Inventory.findOneAndUpdate(id._id, {
    inventoryData: req.body.inventoryData || [{Item:"",Description:"", Quantity:"", SellingPrice:""}],
    ingredientsData: req.body.ingredientsData || [{Item:"",Description:"", Quantity:"", SellingPrice:""}]
  }, {new: true})
  
  res.status(201).json(inv)
})
  
const deleteInventory = asyncHandler(async(req, res) =>{
  const InventoryID = req.body._id
  const inv = await Inventory.findByIdAndDelete(InventoryID)  
  res.status(201).json({message: ` ${inv.InventoryName} deleted`})
})

module.exports ={
    getInventory,
    createInventory,
    updateInventory,
    deleteInventory
}