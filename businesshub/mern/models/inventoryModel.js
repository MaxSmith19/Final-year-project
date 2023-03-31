const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema({
    userID: {type: String, required: true},
    inventoryData: {type:Object,required: true}, // Contains the actual stock
    ingredientsData: {type:Object,required: false} // Contains the items to make the stock - likely optional
});

module.exports = mongoose.model('Inventory',inventorySchema)