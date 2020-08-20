const express = require("express")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const nodemailer = require("nodemailer")
const multer = require('multer')
const path = require('path')
const requireAuth = require('../middlewares/requireAuth')
const Request = mongoose.model('Request')
const Good = mongoose.model('Good')
const bcrypt = require('bcrypt')


const router = express.Router()


router.post("/signup", async(req,res) => {
    console.log(req.body)
    req.body.username = req.body.username.replace(/ /g, "")
    
    const {email, password, username, userType, phoneNumber} = req.body  

    if(!email || !password || !username || !phoneNumber){
        return res.send("You must provide all information")
    }
    
    try{
    
    const user = new User({
        username: username,
        email: email,
        password: password,
        userType: userType,
        profilePicture: "",
        phoneNumber: phoneNumber
    })
      
    await user.save()
    console.log("created")

    // CREATING A Json web TOken

    const token = jwt.sign({userId: user._id}, "MY_SECRET_KEY")
    // user._id is the id of the user gotten from the database...secret key can be any string

    res.send({token: token, username: user.username, userType: user.userType, profilePicture: user.profilePicture})

     } catch (err){
       
        return res.send("username or email already exist")  // the return will simply not allow execution of anycode after this line
    //}
}
})

router.post('/signin', async(req, res) => {
    req.body.username = req.body.username.replace(/ /g, "")
    const {username, password} = req.body
    console.log(req.body)
    
    
    
    if (!username || !password){ 
      return  res.send("You must provide username and password")
    }
    
   const user = await User.findOne({username: username})
    // we are using await because the operation(asynchronous) is going to take some time as 
    // mongoose has to reach out to MongoDB database

    //NOTE: the user value gotten from the database will contain existing email and hashed password

    console.log(user.password)
    if(!user){
        return res.send("Invalid password or email")
    }
    else{
        try{
           await user.comparePassword(password)
           const token = jwt.sign({userId: user._id}, "MY_SECRET_KEY")  //,{expiresIn: "6s"} or "6d" or "6h"
           res.send({token: token, username: user.username, userType: user.userType, profilePicture: user.profilePicture})
           console.log("welcome to your account")
        }           
        catch(err){
            return res.send("Invalid password or username")   
        }  
    }
})

// router.post("/test",requireAuth,(req,res)=>{
//     var today = new Date
//     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
//     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
//     res.send({message:"you are welcome", date: date, time: time})
// })



router.post('/uploadDp', requireAuth, async (req, res) => {  
            if(!req.body.imageUrl){
                return res.send("please upload an image")
            }
               
              
               await User.findByIdAndUpdate({_id: req.user._id}, {
                _id: req.user._id,
                username: req.user.username,
                email: req.user.email,
                phoneNumber: req.user.phoneNumber,
                password: req.user.password,
                userType: req.user.userType,
                profilePicture: req.body.imageUrl
                
            }, 
            {new: true}, (err,doc)=>{
        
            if (!err){
            console.log("successfully updated")
            res.send("successful")
            }
           else{
            console.log("error")
            res.send("error occured")
            }
        })
        
             }
         )
      
      
         router.get("/profile", requireAuth, async(req,res)=>{
            if (req.user.userType == "seller"){
                const orders = await Request.find({ownerName: req.user.username})  // number of received order
                const uploaded = await Good.find({ownerName: req.user.username})   //  number of goods uploaded
                const receivedOrders = orders.length
                const goodsUploaded = uploaded.length
                return res.send({username: req.user.username, email: req.user.email, phoneNumber: req.user.phoneNumber, userType: req.user.userType, receivedOrders, goodsUploaded})
            }
            else{
        
                const orderNumber = await Request.find({requestorName: req.user.username}) //  number of request made
                const orderMade = orderNumber.length
                console.log({username: req.user.username, email: req.body.email, phoneNumber: req.user.phoneNumber, userType: req.user.userType, orderMade})
                return res.send({username: req.user.username, email: req.user.email, phoneNumber: req.user.phoneNumber, userType: req.user.userType, orderMade})
            }
             
        })

router.post("/forgetPassword", async(req,res)=>{

    if(!req.body.email){
        return res.send("You must provide the email you registered with")
    }
    req.body.email = req.body.email.replace(/ /g, "")

    const user = await User.findOne({email: req.body.email}) 

    if(user){
        var generate = Math.floor(100000 + Math.random() * 900000)        
                
        let transporter = nodemailer.createTransport({
          
         
         //service: 'gmail',
         host: "smtp.gmail.com",
         port: 465,
         secure: true,
          auth: {
            // user: 'olaniyi.jibola152@gmail.com',
            // pass: 'Ridko5267$'
            user: 'gtfintech@gmail.com',
            pass: 'rncvncbwdrixbscw'
          },
   
        });
      
        
        let mailOptions = {
          from: '"Shpwyse" <olaniyi.jibola152@gmail.com>', 
          to: req.body.email, 
          subject: 'Shpwyse - Forget Password', 
          text: `Your code to access password reset is ${String(generate)}.`
        
        };
      
    
        transporter.sendMail(mailOptions, (error,info)=>{
            
          if(error){
              return console.log(error)
          } 
    
         else{ 
             console.log("Message sent: %s", info.messageId);
             console.log(generate)
             return res.send({code: generate})
          }
        
        })
    }
    else{
       return res.send("Email provided has not been registered")
    }
})



router.post('/updatePassword', async (req, res) => {  
   if(!req.body.password){
       return res.send("Enter new password")
   }
     console.log(req.body)
     req.body.email = req.body.email.replace(/ /g, "")
       
      const user = await User.findOne({email: req.body.email})
      console.log(user)

        bcrypt.genSalt(10, (err, salt) => {
            
            bcrypt.hash(req.body.password, salt, async(err, hash)=>{
                console.log(hash)
                
                const newpassword = hash

               
                

                await User.findByIdAndUpdate({_id: user._id}, {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    password: newpassword,
                    userType: user.userType,
                    profilePicture: user.profilePicture 
                    
                }, 
                {new: true}, (err,doc)=>{
            
                if (!err){
                console.log("successfully updated")
                res.send({message: "successful", user: doc})
                }
               else{
                console.log("error occured during update")
                res.send("error occured")
                }
            })
               
            })
        })
      
       

     }
 )


module.exports = router