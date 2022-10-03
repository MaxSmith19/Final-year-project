const express = require("express")
const dotenv = require("dotenv").config()

const port = process.env.PORT || 5000

const app=express()
app.use('/api/logins', require('./routes/loginRoutes'))

app.get('/api/logins', (req, res) =>{
    res.json({message: 'Hamburger'})
})

app.listen(port,()=>console.log(`Server started on port ${port}`))