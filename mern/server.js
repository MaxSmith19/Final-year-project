const express = require("express")
const dotenv = require("dotenv").config()
const colors = require("colors")
const cors = require("cors")
const { errorHandler } = require("./middleware/errorMiddleware")
const { corsMiddleware } = require("./middleware/corsMiddleware")
const bodyParser = require("body-parser")
const port = process.env.PORT || 5050
const {connectDB} = require("./config/db")
const cookieParser = require("cookie-parser")

connectDB()

const app=express()

  
app.use(express.json())
app.use(express.urlencoded(false))
app.use(cors({ 
  origin: ['http://82.20.49.101', 'http://localhost:3000'], 
  credentials: true 
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});
app.use(cookieParser())
app.use('/uploads', express.static('uploads'));
  

app.use('/api/Users', require("./routes/userRoutes.js"))
app.use('/api/Ledgers', require('./routes/ledgersRoutes.js'))
app.use('/api/Socials', require('./routes/socialMediaRoutes.js'))
app.use('/api/Inventory', require('./routes/inventoryRoutes.js'))

app.use(errorHandler)


app.listen(port,()=>console.log(`Server started on port ${port}`))
