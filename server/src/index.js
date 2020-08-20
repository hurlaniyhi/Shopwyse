require("./models/User")
require("./models/Goods")
require("./models/Request")
require("./models/Cart")
require("./models/chats")
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require("./routes/authRoutes")
const goodsRoutes = require("./routes/goodsRoutes")
const requestRoutes = require("./routes/requestRoutes")
const cartRoute = require("./routes/cartRoute")
const chatRoute = require("./routes/chatRoute")
const cors = require("cors")

const requireAuth = require("./middlewares/requireAuth")
var port = process.env.PORT || 8080 

const app = express() 
const server = require("http").createServer(app)
const io = require('socket.io').listen(server)
const Chat = mongoose.model('Chat')
const Request = mongoose.model('Request')


app.use(cors({
    origin: "*",
    methods: "*"
}))

app.use(bodyParser.json())
app.use("/",authRoutes) //  the "/" is not necessary
app.use(goodsRoutes)
app.use(requestRoutes)
app.use(cartRoute)
app.use(chatRoute)


const messages = []

io.sockets.on("connection", socket => {
    console.log("A user is connected")
    
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