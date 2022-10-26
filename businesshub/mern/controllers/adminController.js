const asyncHandler = require("express-async-handler")

const Admin = require("../models/adminModel")

const loginAdmin = asyncHandler(async(req,res) =>{
    const {username} = req.body
    const admin = await Admin.findOne({username})

    
    if(!Admin){
        res.status(404).json("admin not found")
        throw new Error("not found")
    }

    if(req.body.password==Admin.password){
        res.status(200).json(`${admin.username} Logged into system `)
    }else{
        res.status(204).json("Password not correct")
        throw new Error("Wrong password")
    }
})
const createAdmin = asyncHandler(async(req,res) =>{
    const {username} = req.body
    const admin = await Admin.findOne({username})
    if(admin){
        res.status(302).json('Admin account already exists.')
        throw new Error("Already exists")
    }else{
    const admins = Admin.create({
        username:req.body.username,
        password:req.body.password
        })
        res.status(200).json(admins)

    }
})

module.exports = {
    loginAdmin,
    createAdmin
}