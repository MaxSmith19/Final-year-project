const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    email: {type:String,required:true},
    title: {type:String,required:true},
    description: {type:String,required:true},
    
});
 
module.exports = mongoose.model('Ticket',ticketSchema)