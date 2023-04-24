const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/userModel");
const { validEmail,validPassword } = require("../regex");
const jwt = require("jsonwebtoken");

//@ROUTE POST /verifyUser
//@HEADER Authorization- the users bearer token
//Returns all data on user based on their given mongo _id
const verifyUser = asyncHandler(async (req, res) => {
  console.log("verifyUser")
  const token =  jwt.verify(req.query.token, process.env.JWT_SECRET);
  const user = await User.findOneAndUpdate({ _id: token.id }, { verified: true });
  res.redirect(`${process.env.APP_URL}/login`);
 
});



//@ROUTE GET /get
//@HEADER Authorization- the users bearer token
//@Desc Gets the currently authenticated users credentials
const getUser = asyncHandler(async (req, res) => {
    const token=decodeJWT(req,res)
    //use the decode function from AuthMiddleware to decode the token
    const Users = await User.findOne({_id:token.id}).select("-password");
    //recieve the users data using the token id, without their password being shown
    res.status(200).json(Users)
    // OK - Sending the data back to the client
  })

//@ROUTE POST /LOGIN
//@HEADER Authorization- the users bearer token
//@DESC LOGS USER INTO SYSTEM, CHECKING DATA FROM MONGO
const loginUser = asyncHandler(async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      // findOne is needed as it find the first available user with the given email
      // As there should only be one user with the given email
      if (!user) {
        res.status(401).json({ message: "User not found" });
      }
      if(!user.verified){
        res.status(401).json({ message: "User is not verified" });
      }
      if (await bcrypt.compare(req.body.password, user.password)) {
        // if the hashed password matches the hashed password in the database
        res.status(200).json({
          _id: user._id,
          token: generateToken(user._id),
          isAdmin: user.isAdmin,
        });
      } else {
        res.status(401).json({ message: "Email or password is incorrect" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });
  
//@ROUTE POST /changePassword
//@HEADER Authorization- the users bearer token
//@Desc uses the provided URL + token to change the users password
const changePassword =asyncHandler(async(req, res) => {
    const Users = await User.findOne({email: req.body.email})

    if(!Users || req.body.password===""){
        res.status(400).json("Password is incorrect")
        throw new Error("Password incorrect")
    }

    const hashedPassword= await bcrypt.hash(req.body.password,10)
    const updatedUser = await User.findByIdAndUpdate(Users._id,{password: hashedPassword},{new: true,})
    res.status(200).json(updatedUser)


})
//@ROUTE POST /
//REGISTERS USER, ADDS DATA INTO MONGO
//@HEADER Authorization- the users bearer token
//@Desc Creates a new user and adds them to mongo
const registerUser = asyncHandler(async(req, res) =>{
    const email = req.body.email

    if(!validEmail.test(req.body.email)){
        return res.status(401).json("Email does not meet the requirements")
    }
    if(!validPassword.test(req.body.password)){
        return res.status(401).json("Password does not meet the requirements")
      }
    const userExists = await User.findOne({email})
    if(userExists){
      console.log("User already exists")
        return res.status(401).json("User already exists")
    }
    const hashedPassword= await bcrypt.hash(req.body.password,10)
    //hash the password using the blowfish en cryption algorithm, 
    //"10", forms the salt that is added to the end of the password for additional security
    const users = await User.create({
        businessName:req.body.businessName,
        password: hashedPassword,
        email:req.body.email,
    })
    //create a new user with the hashed password
    const id = users._id
    res.status(200).json({
        token: generateToken(users._id)
        //send the token back to the client to be formed into a cookie
    })
})

//@ROUTE PUT /update
//@HEADER Authorization- the users bearer token
//@desc Updates the currently authenticated user
const updateUser = asyncHandler(async( req, res) =>{
  try{
    const token = jwt.verify(req.headers.authorization.split(" ")[1], 
    process.env.JWT_SECRET);
    //Had to be changed for jest to work with verifying jwts
    const Users = await User.findById({_id: token.id})
    if(!Users){
        res.status(400)
        throw new Error("User not found")
    }
    if(req.file){
        req.body.businessLogo = req.file.path
    }
    if(req.body.businessName===""){
        req.body.businessName = Users.businessName
    }
    const updatedUser = await User.findByIdAndUpdate(token.id,req.body,{new: true,})
    //using the given data, update the user in the database with the content in the request body
    res.status(200).json(updatedUser)
  }catch(error){
    res.status(401).json({error: "User is not verified"})
  }
})
//@ROUTE DELETE /del
//@HEADER Authorization- the users bearer token
//@desc deletes the currently authenticated user from the database
const deleteUser = asyncHandler(async(req, res) =>{
    const token = decodeJWT(req,res)
    const Users = await User.findById({_id: token.id})
    if(!Users){
        res.status(400)
        throw new Error("User not found")
    }
    const deletedUser = await User.findByIdAndDelete({_id: token.id},req.body)
    res.status(200).json(deletedUser);

})

const decodeJWT = (req, res) => {
  try{
    console.log(req.headers.authorization)
    let token = req.headers.authorization.split(" ")[1]
    if(token===null){
      token= req.cookies.token
    }
    return jwt.verify(token, process.env.JWT_SECRET);
  }catch(error){
    res.status(401).json({message: error.message})
    throw new Error("jwt must be provided")
  }
}
  //for generating jwt tokens for authentication
  const generateToken = (id) => {
      const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
      });
      return token;
    }
    
module.exports ={
    getUser,
    loginUser,
    changePassword,
    registerUser,
    updateUser,
    deleteUser,
    verifyUser
} 