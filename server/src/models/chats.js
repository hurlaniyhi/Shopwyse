const mongoose = require('mongoose')


const infoSchema = new mongoose.Schema({
    
        text: String,
        side: String,
        ownerName: String,
        requestorName: String,
        time: String
    
})


const chatSchema = new mongoose.Schema({
        chatId:{ 
            type: String,
            required: true
        },
        chats: [infoSchema]
       
})

mongoose.model('Chat', chatSchema)