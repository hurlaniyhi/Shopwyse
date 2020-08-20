const mongoose = require('mongoose')



const cartSchema = new mongoose.Schema({
    
    image: {
       type: String,
       required: true
    },
    goodName: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    cartOwner: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },

   
})


mongoose.model('Cart', cartSchema)
