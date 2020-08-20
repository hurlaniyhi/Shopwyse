const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')
const multer = require('multer') 
const path = require('path')
const { request } = require('http')

const Request = mongoose.model('Request')
const Chat = mongoose.model('Chat')

const router = express()

router.use(requireAuth)  


// Fetch tracks from database
router.get('/buyerRequests', async (req, res) => {
    console.log("all request made by buyer")
   
    const requests = await Request.find({requestorName: req.user.username}) 
    res.send(requests)

})

router.get('/requestsToSeller', async (req, res) => {  
    console.log("all requests made to seller")
   
    const requests = await Request.find({ownerName: req.user.username}) 
    if(requests){
    
 
    res.send(requests)
    }
})



 
router.post('/updateRequest', async (req, res) => {
   
 const document = await Request.findOne({_id: req.body.id})
 
   
 if (document){
    if(req.body.status == "Accepted"){
        var changeStatus = "Accepted"
    }
    else if(req.body.status == "Completed"){
        var changeStatus = "Completed"
    }
    else if (req.body.status == "Rejected"){
        var changeStatus = "Rejected"
    }

   await Request.findByIdAndUpdate({_id: req.body.id}, {
        _id: req.body.id,
        image: document.image,
        goodName: document.goodName,
        ownerName: document.ownerName,
        requestorName: document.requestorName,
        ownerPhoneNumber: document.ownerPhoneNumber,
        requestorPhoneNumber: document.requestorPhoneNumber,
        price: document.price,
        status: changeStatus,  
        date: document.date, 
        chats: document.chats
    }, 
    {new: true}, (err,doc)=>{

    if (!err){
    
    console.log("successfully updated")
    res.send("successfully updated")
    }
   else{
    console.log("error occur during update")
    }
})
 }
 else{
     res.send("request did not exist in the database")
 }
})

   
   

router.post('/request', async (req, res)=>{
    
      
            try{

            const {goodName, ownerName, price, imageUrl,ownerPhoneNumber} = req.body
            
   
            var today = new Date
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

                const request = new Request({
                  image: imageUrl,
                  goodName,
                  ownerName,
                  requestorName: req.user.username,
                  ownerPhoneNumber,
                  requestorPhoneNumber: req.user.phoneNumber,
                  price,
                  status: "Pending",
                  date: date,
                  buyerCounts: 0,
                  sellerCounts: 0,
                  chats: []
              })
          
              await request.save()
              console.log("saved")
              res.send({request: request})
            } catch (err){
                return res.send("An error occured")
            }  
    
})


router.post("/deleteRequest", (req, res) => {
    Request.findByIdAndRemove(req.body.id, (err,doc)=>{
        if(!err){
            console.log("successful")
            res.send("successful")
        }
        else{
            res.send("error")
        }
    })
})



 router.post("/deleteRequests", async(req, res) => {
      const del = await Request.deleteMany({}, (err,doc)=>{
        if(!err){
          return res.send("success")
        }
      })
         
    })


module.exports = router