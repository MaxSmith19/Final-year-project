const mongoose = require('mongoose')

const ledgerSchema = mongoose.Schema({
    userID: {type: String, required: true},
    ledgerName: {type:String,required: true},
    ledgerData: {type:Object,required: false},
    //Object refers to an array of json objects.
    //it isnt strictly required, as it can be updated later.
});

module.exports = mongoose.model('Ledger',ledgerSchema)