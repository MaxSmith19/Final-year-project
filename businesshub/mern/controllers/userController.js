const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/UserModel");
const { validEmail,validPassword } = require("../regex");
const jwt = require("jsonwebtoken");
const { RiCreativeCommonsZeroLine } = require("react-icons/ri");

//Returns all data on user based on their given mongo _id
const getUser = asyncHandler(async (req, res) => {
    const token=decodeJWT(req,res)
    const Users = await User.find({_id:token.id}).select("-password");
    console.log(Users)
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
        res.status(200).json({
            _id : user._id,
            token: generateToken(user._id)
        })
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
        businessName:req.body.businessName,
        password: hashedPassword,
        email:req.body.email,
    })
    
    res.status(200).json({
        token: generateToken(users._id)
    })
})

const updateUser = asyncHandler(async( req, res) =>{
    const token = decodeJWT(req,res)
    const Users = await User.findById({_id: token.id})
    if(!Users){
        res.status(400)
        throw new Error("User not found")
    }
    const updatedUser = await User.findByIdAndUpdate(token.id,req.body,{new: true,})
    res.status(200).json(updatedUser)
})

const decodeJWT = (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    return decoded=jwt.verify(token, process.env.JWT_SECRET);
}
//for generating jwt tokens for authentication
const generateToken = (id) => {

    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    })
}

const deleteUser = asyncHandler(async(req, res) =>{
    const token = decodeJWT(req,res)
    const Users = await User.findById({_id: token.id})

    if(!Users){
        res.status(400)
        throw new Error("User not found")
    }
    const deletedUser = await User.findByIdAndDelete({_id: token.id},req.body)

    res.status(200).json(deletedUser);

    res.status(200).json({message: `deleting User ${token.id}`})
})

module.exports ={
    getUser,
    loginUser,
    registerUser,
    updateUser,
    deleteUser
}