const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    businessName: {type:String,required: true},
    businessLogo: {type:String,required: false},
    email: {type:String,required:true},
    password:{type:String,required:true},
});

module.exports = mongoose.model('User',userSchema)