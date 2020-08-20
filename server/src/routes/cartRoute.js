const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')
const multer = require('multer') 
const path = require('path')

const Cart = mongoose.model('Cart')

const router = express()

router.use(requireAuth)  



router.get('/myCarts', async (req, res) => {
    console.log("my carts")
   
    
    const carts = await Cart.find({cartOwner: req.user.username}) 
    console.log(carts)
    res.send(carts)


})





router.post('/addCart', async (req, res) => {
                 

               try{

                const{goodName, price, imageUrl, ownerName,phoneNumber} = req.body
                console.log(req.body)
                console.log(req.user.username)
                

                const cart = new Cart({
                    image: imageUrl,
                    goodName,
                    ownerName,
                    phoneNumber: phoneNumber, 
                    price,
                    cartOwner: req.user.username
                })
                await cart.save()
                
                console.log(cart)
                return res.send({cart: cart})

              } catch (err){

                  return res.send("Provide appropriate information")

              }
      
      
})





router.post("/deleteCart", (req, res) => {
    Cart.findByIdAndRemove(req.body.id, (err,doc)=>{
        if(!err){
            res.send("successful")
        }
        else{
            res.send("error")
        }
    })
})


module.exports = router