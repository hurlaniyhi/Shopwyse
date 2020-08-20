const mongoose = require('mongoose')





const requestSchema = new mongoose.Schema({
    
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
    requestorPhoneNumber: {
        type: String,
        required: true
    },
    ownerPhoneNumber: {
        type: String,
        required: true
    },
    price: {
        type: String,
        requires: true
    },
    requestorName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    buyerCounts: {
        type: Number,
    },
    sellerCounts: {
        type: Number
    }
    

   
})


mongoose.model('Request', requestSchema)
