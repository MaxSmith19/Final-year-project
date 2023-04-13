const express = require("express")
const dotenv = require("dotenv").config()
const colors = require("colors")
const cors = require("cors")
const { errorHandler } = require("./middleware/errorMiddleware")
const { corsMiddleWare } = require("./middleware/corsMiddleware")
const bodyParser = require("body-parser")
const port = process.env.PORT || 5050
const {connectDB} = require("./config/db")
const cookieParser = require("cookie-parser")
const {userRoutes} = require("./routes/userRoutes")

connectDB()

const app=express()

app.use(express.json())
app.use(express.urlencoded(false))
app.use(cors())
app.use(cookieParser())
app.use('/uploads', express.static('uploads'));


app.use('/api/Users', userRoutes)
app.use('/api/Ledgers', require('./routes/ledgersRoutes'))
app.use('/api/Socials', require('./routes/socialMediaRoutes'))
app.use('/api/Inventory', require('./routes/inventoryRoutes'))



app.listen(port,()=>console.log(`Server started on port ${port}`))