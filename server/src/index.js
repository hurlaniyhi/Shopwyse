require("./models/User")
require("./models/Goods")
require("./models/Request")
require("./models/Cart")
require("./models/chats")
require("./models/Likes")
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require("./routes/authRoutes")
const goodsRoutes = require("./routes/goodsRoutes")
const requestRoutes = require("./routes/requestRoutes")
const cartRoute = require("./routes/cartRoute")
const chatRoute = require("./routes/chatRoute")
const likeRoute = require("./routes/likeRoute")
const cors = require("cors")

const requireAuth = require("./middlewares/requireAuth")
var port = process.env.PORT || 8080 

const app = express() 
const server = require("http").createServer(app)
const io = require('socket.io').listen(server)
const Chat = mongoose.model('Chat')
const Good = mongoose.model('Good')
const Like = mongoose.model('Like')
const Request = mongoose.model('Request') 


app.use(cors({
    origin: "*",
    methods: "*"
}))
  
app.use(bodyParser.json())
app.use("/",authRoutes) 
app.use(goodsRoutes)
app.use(requestRoutes)
app.use(cartRoute)
app.use(chatRoute)
app.use(likeRoute)




io.sockets.on("connection", socket => {
    console.log("A user is connected")
    //io.emit("connect", "good") 
    
    socket.on("chat message", msg => {   
        
    console.log(msg)

    socket.join(msg.chatId) 


   const saveChat = async() =>{
    try{
      
        const check = await Chat.findOne({chatId: msg.chatId}) 
        

    
     if(!check){
    
        var arr = [msg.info]
        console.log(arr)

        const chat = new Chat({
         
          chats: arr,
          chatId: msg.chatId
         
      })
  
      await chat.save()
      console.log("saved" + chat)
      io.in(msg.chatId).emit("chat message", {chats: chat})
  
    }

    else{
        console.log("chats in chats", msg.chats.chats)

        var arrUpdate = []
        for (let turnObject of msg.chats.chats ){
            arrUpdate.push(turnObject)
        }
        arrUpdate.push(msg.info)
        

        console.log("array update", arrUpdate)

        await Chat.findByIdAndUpdate({_id: check._id}, {
            _id: check._id,
            chats: arrUpdate
           
        }, 
        {new: true}, (err,doc)=>{
    
        if (!err){
        
        console.log("successfully updated" + doc)
        io.in(msg.chatId).emit("chat message", {chats: doc})
    }
       else{
        console.log("error occur during update")
        }
    })
    }


    }
    

    
    catch (err){
        io.in(msg.chatId).emit("chat message", {error: "An error occur"})
    }  

   }

     
    
    //io.emit("chat message", messages) 
    saveChat()
    
    
                                                        
    })

    socket.on("fetch chats", msg => {   
        
        console.log(msg)
    
        socket.join(msg.chatId) 
  

        const fetchChat = async() => {
            const chats = await Chat.findOne({chatId: msg.chatId}) 
            if(chats){
               console.log("fetched chats") 
               
 
               io.in(msg.chatId).emit("fetch chats", {chats})
            }
            else {
                io.in(msg.chatId).emit("fetch chats", {message: "no chat found"})
           }
        }

        fetchChat()

    })



    socket.on("count chats", msg => {

        socket.join(msg.chatId) 

        const countChats = async() => {
          const document = await Request.findOne({_id: msg.chatId})

          if(msg.sender == "buyer"){
              buyerchat = 0
              sellerchat = 1
              sendTo = document.ownerName
          }
          else if(msg.sender == "seller"){
            buyerchat = 1
            sellerchat = 0
            sendTo = document.requestorName
          }


    if (document){
        await Request.findByIdAndUpdate({_id: msg.chatId}, {
            _id: msg.chatId,
            image: document.image,
            goodName: document.goodName,
            ownerName: document.ownerName,
            requestorName: document.requestorName,
            ownerPhoneNumber: document.ownerPhoneNumber,
            requestorPhoneNumber: document.requestorPhoneNumber,
            price: document.price,
            status: document.status,  
            date: document.date, 
            chats: document.chats,
            buyerCounts: document.buyerCounts + buyerchat,
            sellerCounts: document.sellerCounts + sellerchat
        }, 
        {new: true}, (err,doc)=>{
    
        if (!err){

            console.log("successfully updated")
        
        
        }
       else{
        console.log("error occur during update")
        }
    })
    }

        }

        countChats()
        

    })



    socket.on("stop count", msg => {
        
        socket.join(msg.chatId) 

        const stopCount = async() => {
          const document = await Request.findOne({_id: msg.chatId})
       
          console.log("entered")

          if(msg.sender == "buyer"){
              buyerchat = 0
              sellerchat = 1
          }
          else if(msg.sender == "seller"){
            buyerchat = 1
            sellerchat = 0
          }


    if (document){
        await Request.findByIdAndUpdate({_id: msg.chatId}, {
            _id: msg.chatId,
            image: document.image,
            goodName: document.goodName,
            ownerName: document.ownerName,
            requestorName: document.requestorName,
            ownerPhoneNumber: document.ownerPhoneNumber,
            requestorPhoneNumber: document.requestorPhoneNumber,
            price: document.price,
            status: document.status,  
            date: document.date, 
            chats: document.chats,
            buyerCounts: document.buyerCounts * buyerchat,
            sellerCounts: document.sellerCounts * sellerchat
        }, 
        {new: true}, (err,doc)=>{
    
        if (!err){
        
        console.log("successfully updated")
        
        }
       else{
        console.log("error occur during update")
        }
    })
    }

        }

        stopCount()

    })






    socket.on("likes", async(msg) =>{

    const document = await Like.findOne({productID: msg.id, username: msg.username})
    const Allgoods = await Good.findOne({_id: msg.id})
    console.log("Ok")
    // if(!Allgoods){
    //     return res.send("Product did not exist")
    // }
    
    
    if (document){
     
       await Like.findByIdAndRemove(document._id, async(err,doc)=>{
            if(!err){

                if(Allgoods.likes == 0){
                    var add = 0
                }
                else{
                    var add = 1
                }

                await Good.findByIdAndUpdate({_id: msg.id}, {
                    _id: msg.id,
                    image: Allgoods.image,  
                    goodName: Allgoods.goodName,
                    ownerName: Allgoods.ownerName,
                    phoneNumber: Allgoods.phoneNumber,
                    price: Allgoods.price,
                    likes: Allgoods.likes - add,
                    likeColor: "none"
                    
                }, 
                {new: true}, (err,doc)=>{
            
                if (!err){
                console.log("successfully remove a like")
                io.emit("likes", {response: "good"}) 
                }
               else{ 
                console.log("error occur during update")
                //res.send("error occur during update")
                }
            })
            
            }
            else{
                console.log("error")
            }
        })


    }
    else{
        const like = new Like({
            productID: msg.id,
            username: msg.username
        })
        await like.save()
        console.log("Successful")

        await Good.findByIdAndUpdate({_id: msg.id}, {
            _id: msg.id,
            image: Allgoods.image,  
            goodName: Allgoods.goodName,
            ownerName: Allgoods.ownerName,
            phoneNumber: Allgoods.phoneNumber,
            price: Allgoods.price,
            likes: Allgoods.likes + 1,
            likeColor: "none"
            
        }, 
        {new: true}, (err,doc)=>{
    
        if (!err){
        console.log("successfully added a like")
        io.emit("likes", {response: "good"}) 
        }
       else{ 
        console.log("error occur during update")
        res.send("error occur during update")
        }
    })
    }


    })

})



// kolawole.ridwan152@gmail.com

const mongoUri = "mongodb+srv://Ridwan:Ridko5267$@ridwanlock-uqlxu.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("connected to mongodb cloud")
})

mongoose.connection.on('error', (err) => {
    console.error("Error connecting to mongodb cloud", err)
})

app.get('/',requireAuth, (req, res) => {
    res.send({userId: req.user.email})
})






// app.listen(port, ()=>{
//     console.log("Listening to port 8000")
// })

server.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})