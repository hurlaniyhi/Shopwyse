const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')
const multer = require('multer') 
const path = require('path')

const Like = mongoose.model('Like')
const Good = mongoose.model('Good')

const router = express()

router.use(requireAuth) 


// router.post('/like', async(req,res) => {
//     const {username, id} = req.body
    

//     const document = await Like.findOne({productID: id, username: username})
//     const Allgoods = await Good.findOne({_id: id})
//     console.log("Ok")
//     if(!Allgoods){
//         return res.send("Product did not exist")
//     }
    
    
//     if (document){

//        await Like.findByIdAndRemove(document._id, async(err,doc)=>{
//             if(!err){

//                 if(Allgoods.likes == 0){
//                     var add = 0
//                 }
//                 else{
//                     var add = 1
//                 }

//                 await Good.findByIdAndUpdate({_id: id}, {
//                     _id: id,
//                     image: Allgoods.image,  
//                     goodName: Allgoods.goodName,
//                     ownerName: Allgoods.ownerName,
//                     phoneNumber: Allgoods.phoneNumber,
//                     price: Allgoods.price,
//                     likes: Allgoods.likes - add,
//                     likeColor: "none"
                    
//                 }, 
//                 {new: true}, (err,doc)=>{
            
//                 if (!err){
//                 console.log("successfully remove a like")
//                 res.send("success") 
//                 }
//                else{ 
//                 console.log("error occur during update")
//                 res.send("error occur during update")
//                 }
//             })
            
//             }
//             else{
//                 res.send("error")
//             }
//         })


//     }
//     else{
//         const like = new Like({
//             productID: id,
//             username: username
//         })
//         await like.save()
//         console.log("Successful")

//         await Good.findByIdAndUpdate({_id: id}, {
//             _id: id,
//             image: Allgoods.image,  
//             goodName: Allgoods.goodName,
//             ownerName: Allgoods.ownerName,
//             phoneNumber: Allgoods.phoneNumber,
//             price: Allgoods.price,
//             likes: Allgoods.likes + 1,
//             likeColor: "red"
            
//         }, 
//         {new: true}, (err,doc)=>{
    
//         if (!err){
//         console.log("successfully added a like")
//         res.send("success") 
//         }
//        else{ 
//         console.log("error occur during update")
//         res.send("error occur during update")
//         }
//     })
//     }


// })

module.exports = router