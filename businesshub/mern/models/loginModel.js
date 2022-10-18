const mongoose = require('mongoose')

const loginSchema = mongoose.Schema({
    text: {type:String,required: true}
}, {timestamps: true});

module.exports = mongoose.model('Login',loginSchema)