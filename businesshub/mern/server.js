const express = require("express")
const dotenv = require("dotenv").config()
const colors = require("colors")
const port = process.env.PORT || 5050
//TODO Error middleware
const connectDB = require("./config/db")

connectDB()

const app=express()

app.use(express.json())

app.use(express.urlencoded(false))

app.use('/api/Users', require('./routes/userRoutes'))
app.use('/api/Admin', require('./routes/adminRoutes'))

app.listen(port,()=>console.log(`Server started on port ${port}`))