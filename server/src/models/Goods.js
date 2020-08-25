const mongoose = require('mongoose')



const goodSchema = new mongoose.Schema({
    
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
    price: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
    },
    likeColor: {
        type: String
    }

   
})


mongoose.model('Good', goodSchema)
