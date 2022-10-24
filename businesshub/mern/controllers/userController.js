const asyncHandler = require("express-async-handler")

const User = require("../models/UserModel")

const getUser = asyncHandler(async (req, res) => {
    const Users = await User.find();
    res.status(200).json(Users)
  })

const setUser = asyncHandler(async(req, res) =>{
    console.log(req.body)
    if(!req.body.text){
        res.status(400)
        throw new Error("Please add text")
    }

    const Users = await User.create({
        text: req.body.text,
    })

    res.status(200).json(Users)
})

const updateUser = asyncHandler(async( req, res) =>{
    const Users = await User.findById(req.params.id)

    if(!Users){
        res.status(400)
        throw new Error("User not found")
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new: true,})

    res.status(200).json(updatedUser)
})
 
const deleteUser = asyncHandler(async(req, res) =>{
    const Users = await User.findById(req.params.id)

    if(!Users){
        res.status(400)
        throw new Error("User not found")
    }
    const deletedUser = await User.findByIdAndDelete(req.params.id,req.body)

    res.status(200).json(deletedUser);

    res.status(200).json({message: `deleting User ${req.params.id}`})
})

module.exports ={
    getUser,
    setUser,
    updateUser,
    deleteUser
}