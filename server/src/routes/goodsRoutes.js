const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')
const multer = require('multer') 
const path = require('path')

const Good = mongoose.model('Good')

const router = express()

router.use(requireAuth)  


// Fetch tracks from database
router.get('/ownergoods', async (req, res) => {
    console.log("welcome")
   
    
    const goods = await Good.find({ownerName: req.user.username}) 
    res.send(goods.reverse())

})

router.get('/allgoods', async (req, res) => {
    console.log("welcome")
   
    
    const goods = await Good.find({}) 
    res.send(goods.reverse())

})




router.post('/uploadGoods', async (req, res) => {
                 

               try{

                const{goodName, price, imageUrl} = req.body
                console.log(req.body)

                if(!goodName || !price || !imageUrl) {
                    return res.send("you must provide all information")
                }

                const good = new Good({
                    image: imageUrl,
                    goodName,
                    ownerName: req.user.username,
                    phoneNumber: req.user.phoneNumber, 
                    price
                })
                await good.save()
                console.log("Successful")
                console.log(good)
                res.send("Successful")
              } catch (err){
                  return res.send("Provide appropriate information")
              }
      
      
})


router.post('/updateGoods', async (req, res) => {
    const {id, image_url, goodName, price} = req.body
    
    // test id ....5f2163c179fda6235461a8ef
   await Good.findByIdAndUpdate({_id: req.body.id}, {
        _id: id,
        image: image_url,
        goodName: goodName,
        ownerName: req.user.username,
        phoneNumber: req.user.phoneNumber,
        price: price
        
    }, 
    {new: true}, (err,doc)=>{

    if (!err){
    console.log("successfully updated")
    res.send("success") 
    }
   else{ 
    console.log("error occur during update")
    res.send("error occur during update")
    }
})

})



router.post("/deleteGoods", (req, res) => {
    Good.findByIdAndRemove(req.body.id, (err,doc)=>{
        if(!err){
            res.send("successful")
        }
        else{
            res.send("error")
        }
    })
})


router.post("/delgoods", async(req, res) => {
    const del = await Good.deleteMany({}, (err,doc)=>{  
      if(!err){
        return res.send("success")
      }
    })
       
  })



module.exports = router