import React, {useState,useContext, useEffect} from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView ,
   FlatList, ImageBackground, ActivityIndicator, YellowBox, TextInput, KeyboardAvoidingView} from "react-native";
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import {SafeAreaView} from 'react-navigation'
import {Zocial} from '@expo/vector-icons'
import {EvilIcons} from '@expo/vector-icons'
import {FontAwesome, Feather, Entypo, AntDesign, MaterialIcons} from '@expo/vector-icons'
import {NavigationEvents} from 'react-navigation'
import tradeApi from "../API/tradeApi"
import AuthContext from "../context/AuthContext"
import io from "socket.io-client"
import { useIsFocused } from '@react-navigation/native'



import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'





const BuyerChats = (props) => {

  // const data = props.navigation.getParam("data")

  const {state, saveChats, fetchMyChats, stopLoading, fetchMyRequests} = useContext(AuthContext)

  const [text,setText] = useState("")
  const [show, setShow] = useState([])

  function websocket(){
    const me = "fine"
    //socket = io("https://shopwyse-backend.herokuapp.com")
   // make the connection to the backend
   try{
    
    socket.emit("stop count", {chatId: state.chatId, sender: "buyer"})
  }
  catch{
    alert("No network connection")
  }

    
  try{
  socket.on ("chat message", async(msg) => {     // receive a message from the backend
       
    
     

     await saveChats(msg.chats)
     

    
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

    
    return () => {
      
      try{
    
        socket.emit("stop count", {chatId: state.chatId, sender: "buyer"})
        fetchMyRequests()
        //alert("good")
      }
      catch{
        alert("No network connection")
      }
    }
  }, []);



  const send = async(sms, side, ownerName, requestorName, time) => {
  
  try{
    var today = new Date
    var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()

    await socket.emit("chat message", {chatId: state.chatId, chats: state.myChats, info: {text: sms, side, ownerName, requestorName, time}})
    await socket.emit("count chats", {chatId: state.chatId, sender: "buyer"})
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
// minheight....532

  return (
    <KeyboardAwareScrollView 
  resetScrollToCoords={{ x: 0, y: 0 }} 
  viewIsInsideTabBar={false} 
  contentContainerStyle={[{minHeight: 380}, {overflow:"hidden", flex: 1}]} 
  style={[Platform.OS === 'ios' ? {height:65}:{},{zIndex:50, flex: 1}]} 
  scrollEnabled={false} enableAutomaticScroll={true}>
    <SafeAreaView style={{flex: 1,  backgroundColor: "rgba(196, 194, 194",}}>
      <NavigationEvents onWillFocus={fetchChats}/>
      
    
    
   
   
   
    <ImageBackground 
    source={require("../../assets/whatsappBack.png")}
    style={{height: hp("100%"), width: wp("100%"), flex: 1}}> 

    
    
    <Text style={{textAlign: "center", paddingVertical: wp("2%"), color: "#595757"}}>{`Chat with ${state.chatWith}`}</Text>
    <ScrollView style={{flex: 1}}>
   
   {state.loadChat ? <ActivityIndicator size="large" style={{marginTop: 200}} /> : 
  
     <FlatList
    data={state.myChats.chats}
    keyExtractor={(item) => item._id}
    renderItem={({item}) => {
      
      return (
        <View>
       {item.side == "right" ? <View style={{alignItems: "flex-end", marginRight: wp("2%"), marginLeft: wp("15%")}}>
          <View style={[styles.sms, {backgroundColor: "#D7F1BF"}]}>
           <Text style={{paddingBottom: hp("0.5%")}}>{item.text}</Text><Text style={{fontSize:wp("1.5%"), color: "#595757"}}>{item.time}</Text>
          </View>
        </View>: <View style={{alignItems: "flex-start", marginLeft: wp("2%"), marginRight: wp("15%")}}>
        <View style={styles.sms}>
          <Text style={{paddingBottom: hp("0.5%")}}>{item.text}</Text><Text style={{fontSize:wp("1.5%"), color: "#595757"}}>{item.time}</Text>
        </View>
      </View> }
      </View> 
    
      )
    }}
  />
   
}
  
   </ScrollView>
      <View style={{flexDirection: "row"}}>
        <TextInput 
            style={styles.textInput}
            value={text} 
            autoCapitalize="none"
            multiline={true}
            autoCorrect={false}
            placeholder="Enter Your Chat"
            onChangeText={(newValue)=> setText(newValue)} 
        /> 

        <TouchableOpacity style={styles.send} onPress={()=> send(text, "right", state.chatWith, state.chatOwner)}>
  {!state.carting ? <MaterialIcons style={{color: "white"}} name="send" size={30} /> : <ActivityIndicator /> }
        </TouchableOpacity>
       
      </View>
    </ImageBackground>
    
    </SafeAreaView>
    </KeyboardAwareScrollView> 
  )
};

BuyerChats.navigationOptions = ({navigation}) => {
  
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
    paddingBottom: hp("2%"),
    color: "white"
  },

  textInput: {
    //height: hp("6.7%"),
    flex: 1,
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
    
    marginVertical: hp("1%"),  
    paddingTop: hp("1.5%"),
    paddingBottom: hp("1%"),
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    justifyContent: "center",
    paddingRight: wp("3%"), 
    fontSize: wp("4.5%"), 
    paddingLeft: wp("3%")
},
 
 
  overlay: {
    flex: 1,
    justifyContent: "center"
}
});

export default BuyerChats
