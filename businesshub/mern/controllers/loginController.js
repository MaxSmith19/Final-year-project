const asyncHandler = require("express-async-handler")

const Login = require("../models/loginModel")

const getLogin = asyncHandler(async (req, res) => {
    const logins = await Login.find();
    res.status(200).json(logins)
  })

const setLogin = asyncHandler(async(req, res) =>{
    console.log(req.body)
    if(!req.body.text){
        res.status(400)
        throw new Error("Please add text")
    }

    const logins = await Login.create({
        text: req.body.text,
    })

    res.status(200).json(logins)
})

const updateLogin = asyncHandler(async( req, res) =>{
    const logins = await Login.findById(req.params.id)

    if(!logins){
        res.status(400)
        throw new Error("Login not found")
    }
    const updatedLogin = await Login.findByIdAndUpdate(req.params.id,req.body,{new: true,})

    res.status(200).json(updatedLogin)
})

const deleteLogin = asyncHandler(async(req, res) =>{
    const logins = await Login.findById(req.params.id)

    if(!logins){
        res.status(400)
        throw new Error("Login not found")
    }
    const deletedLogin = await Login.findByIdAndDelete(req.params.id,req.body)

    res.status(200).json(deletedLogin);

    res.status(200).json({message: `deleting login ${req.params.id}`})
})

module.exports ={
    getLogin,
    setLogin,
    updateLogin,
    deleteLogin
}