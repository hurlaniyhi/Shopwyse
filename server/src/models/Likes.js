const mongoose = require('mongoose')



const likeSchema = new mongoose.Schema({
    
    productID: {
       type: String,
       required: true
    },
    username: {
        type: String,
        required: true
    },
    

   
})


mongoose.model('Like', likeSchema)
