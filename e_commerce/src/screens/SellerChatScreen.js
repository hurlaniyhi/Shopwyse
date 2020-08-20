import React, {useState,useContext, useEffect} from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView ,
   FlatList, ImageBackground, ActivityIndicator, YellowBox, TextInput} from "react-native";
import {SafeAreaView} from 'react-navigation'
import {FontAwesome, Feather, Entypo, AntDesign, MaterialIcons} from '@expo/vector-icons'
import {NavigationEvents} from 'react-navigation'
import tradeApi from "../API/tradeApi"
import AuthContext from "../context/AuthContext"
import io from "socket.io-client"


import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'





const SellerChats = (props) => {

  // const data = props.navigation.getParam("data")

  const {state, saveChats, fetchMyChats, stopLoading} = useContext(AuthContext)

  const [text,setText] = useState("")



  function websocket(){
    
    //socket = io("https://shopwyse-backend.herokuapp.com") // make the connection to the backend
    
  try{
    socket.emit("stop count", {chatId: state.chatId, sender: "seller"})
  }
  catch{
    alert("No network connection")
  }
    
  try{
    socket.on ("chat message", msg => {     // receive a message from the backend
          
        saveChats(msg.chats)
      
  })
}
  catch{
  alert("No network connection")
}
  
try{
    socket.on ("fetch chats", msg => {     // receive a message from the backend
         if(msg.chats){ 
         saveChats(msg.chats)
         }
         else{
           stopLoading()
         }
         
      })
    }
    catch{
      alert("No network connection")
    }
  
    }
  
    useEffect(() => {
      websocket()   
    }, []);
  
  
  
    const send = async(sms, side, ownerName, requestorName, time) => {
    
    try{
      var today = new Date
      var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()
  
      await socket.emit("chat message", {chatId: state.chatId, chats: state.myChats, info: {text: sms, side, ownerName, requestorName, time}})
      await socket.emit("count chats", {chatId: state.chatId, sender: "seller"})
      setText("")
    }
    catch{
      alert("No network connection")
    }
  
    }
  
  
  const fetchChats = async() => {

    

    try{

      socket = io("https://shopwyse-backend.herokuapp.com")

       socket.emit("fetch chats", {chatId: state.chatId})
     
  
    }
    catch{
      await stopLoading()
      alert("No network connection")
    }
  }
  
  
  
  

  YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
  ])
// https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png


  return (
    <SafeAreaView style={{flex: 1,  backgroundColor: "rgba(196, 194, 194",}}>
      <NavigationEvents onWillFocus={fetchChats}/>
    
    
   
    
   
    <ImageBackground 
    source={require("../../assets/whatsappBack.png")}
    style={{height: hp("100%"), width: wp("100%"), flex: 1}}> 

    
<Text style={{textAlign: "center", paddingVertical: wp("2%"), color: "#595757"}}>{`Chat with ${state.chatOwner}`}</Text>
    
    <ScrollView style={{flex: 1}}>
   
   {state.loadChat ? <ActivityIndicator size="large" style={{marginTop: 200}} /> : 
   <View><FlatList
    data={state.myChats.chats}
    keyExtractor={(item) => item._id}
    renderItem={({item}) => {
      return (
        <View>
       {item.side == "left" ? <View style={{alignItems: "flex-end", marginRight: wp("2%")}}>
          <View style={[styles.sms, {backgroundColor: "#D7F1BF"}]}>
           <Text>{item.text}</Text><Text style={{fontSize:wp("1.5%"), color: "#595757"}}>{item.time}</Text>
          </View>
        </View>: <View style={{alignItems: "flex-start", marginLeft: wp("2%")}}>
        <View style={styles.sms}>
          <Text>{item.text}</Text><Text style={{fontSize:wp("1.5%"), color: "#595757"}}>{item.time}</Text>
        </View>
      </View> }
      </View>
    
      )
    }}
  />
  </View> }
   </ScrollView>
      <View style={{flexDirection: "row"}}>
        <TextInput 
            style={styles.textInput} 
            autoCapitalize="none"
            autoCorrect={false}
            value={text}
            //multiline={true}
            placeholder="Enter Your Chat"
            onChangeText={(newValue)=> setText(newValue)} 
        /> 

        <TouchableOpacity style={styles.send} onPress={()=> send(text, "left", state.chatWith, state.chatOwner)}>
  {!state.carting ? <MaterialIcons style={{color: "white"}} name="send" size={30} /> : <ActivityIndicator /> }
        </TouchableOpacity>
      </View>
    </ImageBackground>
    
    </SafeAreaView>
  )
};

SellerChats.navigationOptions = ({navigation}) => {
    
  return{
  
    headerLeft: ()=> 
    <Entypo style={{paddingLeft: wp("25%"), color: "white"}} name="chat" size={30} />,
  title: `Chats`,
  headerTitleStyle: {
    paddingLeft: wp("23%"),
    
    color: "white",
    fontSize: hp("2.5%"),
    fontStyle: "italic"
  },
  headerStyle: {
    backgroundColor: "#095952"
  }
  
}
}


const styles = StyleSheet.create({
  text: {
    fontSize: wp("7%"),
    paddingTop: hp("2%"),
    color: "white"
  },

  textInput: {
    height: hp("6.7%"),
    marginBottom: hp("0.5%"),
    paddingLeft: wp("5%"),
    backgroundColor: "whitesmoke",
    borderRadius: 25,
    marginLeft: wp("2%"),
    width: wp("82%"),
    paddingRight: wp("5%"), 
    fontSize: wp("4.7%")
},

send: {
    
    height: hp("6.9%"),
    marginBottom: hp("0.5%"),
    backgroundColor: "#095952",
    borderRadius: 100,
    marginLeft: wp("2%"),
    width: wp("13%"), 
    justifyContent: "center",
    alignItems: "center"
},
  

sms: {
    height: hp("5.7%"),
    marginVertical: hp("1%"),
    paddingLeft: wp("4%"),
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    justifyContent: "center",
    // width: wp("60%"),
    paddingRight: wp("4%"), 
    fontSize: wp("4.5%"), 
    paddingLeft: wp("3%"),
    paddingVertical: hp("2%")
},
 
 
  overlay: {
    flex: 1,
    justifyContent: "center"
}
});

export default SellerChats
