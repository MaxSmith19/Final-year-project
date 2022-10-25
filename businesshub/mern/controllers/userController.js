const asyncHandler = require("express-async-handler")

const User = require("../models/UserModel")

const getUser = asyncHandler(async (req, res) => {
    const Users = await User.find();
    res.status(200).json(Users)
  })


//LOGS USER INTO SYSTEM, CHECKING DATA FROM MONGO
const loginUser = asyncHandler(async(req,res) =>{
    const {email} = req.body
    const user= await User.findOne({email});

    if(!user){
        res.status(404).json("User not found")
        throw new Error("not found")
    }
    // console.log(req.body.password)
    // console.log(user.password)
    if(req.body.password==user.password){
        res.status(200).json(`${user.email} Logged into system `)
    }else{
        res.status(204).json("Password not correct")
        throw new Error("Wrong password")
    }
})

//REGISTERS USER, ADDS DATA INTO MONGO
const registerUser = asyncHandler(async(req, res) =>{
    //TODO hashing passwords
    const Users = await User.create({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
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
    loginUser,
    registerUser,
    updateUser,
    deleteUser
}