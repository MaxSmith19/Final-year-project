const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    userID: {type: String, required: true},
    accountName: {type:String,required: true},
    accountData: {type:Object,required: false},
    //Object refers to an array of json objects.
    //it isnt strictly required, as it can be updated later.

});

module.exports = mongoose.model('Account',accountSchema)