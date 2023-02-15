const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    accountName: {type:String,required: true},
    accountData: {type:Object,required: true},

});

module.exports = mongoose.model('Account',accountSchema)