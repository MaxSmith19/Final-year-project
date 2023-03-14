const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/UserModel");
const { validEmail,validPassword } = require("../regex");

const getUser = asyncHandler(async (req, res) => {
    const Users = await User.find();
    res.status(200).json(Users)
  })


//LOGS USER INTO SYSTEM, CHECKING DATA FROM MONGO
const loginUser = asyncHandler(async(req,res) =>{
    const {email} = req.body
    const user = await User.findOne({"email":email})


    if(!user){
        res.status(401).json("User not found")
        throw new Error("User not found")
    }

    if(await(bcrypt.compare(req.body.password, user.password))){
        res.status(200).json(`${user._id}`)
    }else{
        res.status(401).json("Password not correct")
        throw new Error("Wrong password")
    }
})

//REGISTERS USER, ADDS DATA INTO MONGO
const registerUser = asyncHandler(async(req, res) =>{
    const email = req.body.email
    const userExists = await User.findOne({email})
    console.log(validEmail.test(req.body.email))
    if(userExists){
        res.status(401).json("User already exists")
        throw new Error("User already exists")
    }
    if(validEmail.test(req.body.email)){
        throw new Error("email does not meet requirements!")
    }
    if(!validPassword.test(req.body.password)){
        throw new Error("Password does not meet requirements!")
    }

    const hashedPassword= await bcrypt.hash(req.body.password,10)
        
    const users = await User.create({
        username:req.body.username,
        password: hashedPassword,
        email:req.body.email
    })
    
    res.status(200).json(users)
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