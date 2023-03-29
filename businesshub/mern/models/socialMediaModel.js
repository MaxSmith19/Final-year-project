const mongoose = require('mongoose')

const socialsSchema = mongoose.Schema({
    userID: {type:String,required: true},
    etsyOAUTH: {type:String,required: false}

});
 
module.exports = mongoose.model('Social',socialsSchema)