const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    userID: {type:String,required:true},
    title: {type:String,required:true},
    description: {type:String,required:true},
    
});
 
module.exports = mongoose.model('Ticket',ticketSchema)