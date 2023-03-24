const express = require("express")
const dotenv = require("dotenv").config()
const colors = require("colors")
const cors = require("cors")
const { errorHandler } = require("./middleware/errorMiddleware")
const { corsMiddleWare } = require("./middleware/corsMiddleware")
const bodyParser = require("body-parser")
const port = process.env.PORT || 5050
const connectDB = require("./config/db")
const allowedOrigins = ["http://localhost:5000"]
const skipOriginCheck = true;

connectDB()

const app=express()

app.use(express.json())
app.use(express.urlencoded(false))
app.use(cors())

app.use('/api/Users', require('./routes/userRoutes'))
app.use('/api/Admin', require('./routes/adminRoutes'))
app.use('/api/Ledgers', require('./routes/ledgersRoutes'))



app.listen(port,()=>console.log(`Server started on port ${port}`))