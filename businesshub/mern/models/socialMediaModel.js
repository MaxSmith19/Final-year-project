const mongoose = require('mongoose')

const socialsSchema = mongoose.Schema({
    userID: {type:String,required: true},
    etsyAccessToken: {type:String,required:false},
    etsyRefreshToken: {type:String,required:false}

});
 
module.exports = mongoose.model('Social',socialsSchema)