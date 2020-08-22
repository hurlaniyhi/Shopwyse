const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')
const multer = require('multer') 
const path = require('path')
const { request } = require('http')

const Chat = mongoose.model('Chat')

const router = express()

router.use(requireAuth) 




router.post('/fetchChats', async (req, res) => {  
    console.log("all chats")
    console.log(req.body)
   
    const chats = await Chat.findOne({chatId: req.body.chatId}) 
    if(chats){
    console.log("fetched") 
    console.log(chats)
 
    res.send({chats: chats})
    }
    else res.send("nothing found")
})



router.post('/saveChats', async (req, res) => {
    const {chatId, chats, info} = req.body
    console.log(req.body.chats)
   
    try{

        const check = await Chat.findOne({chatId: chatId}) 
        

    
     if(!check){
    
        var arr = [info]
        console.log(arr)

        const chat = new Chat({
         
          chats: arr,
          chatId: chatId,
         
      })
  
      await chat.save()
      console.log("saved")
      res.send({chat: chat})
  
    }

    else{
        console.log("chats in chats", chats.chats)

        var arrUpdate = []
        for (let turnObject of chats.chats ){
            arrUpdate.push(turnObject)
        }
        arrUpdate.push(info)
        

        console.log("array update", arrUpdate)

        await Chat.findByIdAndUpdate({_id: check._id}, {
            _id: check._id,
            chats: arrUpdate
           
        }, 
        {new: true}, (err,doc)=>{
    
        if (!err){
        
        console.log("successfully updated")
        res.send("successful")
        }
       else{
        console.log("error occur during update")
        }
    })
    }


    }
    

    
    catch (err){
        return res.send("An error occured")
    }  


})


router.post("/delchats", async(req, res) => {
    const del = await Chat.deleteMany({}, (err,doc)=>{  
      if(!err){
        return res.send("success")
      }
    })
       
  })

module.exports = router