import React, {useState,useContext, useEffect} from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, Button, ScrollView ,
   FlatList, ImageBackground, ActivityIndicator, YellowBox} from "react-native";
import {SafeAreaView} from 'react-navigation'
import {Zocial} from '@expo/vector-icons'
import {Fontisto} from '@expo/vector-icons'
import {FontAwesome, Feather, Entypo} from '@expo/vector-icons'
import {NavigationEvents} from 'react-navigation'
import tradeApi from "../API/tradeApi"
import AuthContext from "../context/AuthContext"



import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'



// use expo install expo-image-picker  to install expo image picker
//import * as ImagePicker from 'expo-image-picker'
import call from 'react-native-phone-call'


const AllRequests = (props) => {

  const {state, clearErrorMessage, fetchMyRequests, deleteRequest, addId} = useContext(AuthContext)

  YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
  ])
  
  const callme = (phoneNumber) => {
    const args = {
      number:phoneNumber ,
      prompt: false,
    }
    call(args).catch(console.log(console.error()))
  }

  
   


  return (
    <SafeAreaView style={{flex: 1,  backgroundColor: "rgba(196, 194, 194)"}}>
      <NavigationEvents onWillFocus={fetchMyRequests}/>
    
   
    <ImageBackground 
    source={{uri: "https://i.insider.com/5e9a0f4bb3b0920f7361c296?width=1100&format=jpeg&auto=webp"}}
    style={{height: hp("100%"), width: wp("100%")}}> 

    
    
    <View style={styles.overlay}>
    <ScrollView style={{flex: 1}}>
   
   {!state.myRequests ? <ActivityIndicator size="large" style={{marginTop: 200}} /> : <View style={{marginBottom: hp("8%")}}><FlatList
    data={state.myRequests}
    keyExtractor={(item) => item._id}
    renderItem={({item}) => {
      return (

        <View style={styles.title}>
          <View>
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: hp("0.5%")}}>
          <Text style={{color: "#595757", fontSize: wp("5%")}}>{item.goodName}</Text>
          <TouchableOpacity onPress={()=>deleteRequest(item._id)}>
            <FontAwesome name="trash-o" size={27} style={{marginLeft: wp("5%"), color: "#595757"}}/>
            </TouchableOpacity>
            
          </View >
          <Text style={{paddingLeft: wp("5%"), fontSize: wp("3.2"), fontStyle: "italic", color: "#595757"}}>{`Seller:   ${item.ownerName}`}</Text>
          <Image style={styles.image} source={{uri: item.image}} /> 
          <View style={styles.price}><Text style={{alignSelf: "center", color: "white", fontSize: wp("6%")}}>{`NGN ${item.price}`}</Text></View>
          </View>

          <View style={{flexDirection: "row"}}>
          <View style={styles.date}>
              <Fontisto name="date" size={23} style={{color: "green", alignSelf: "center"}}/>
              <Text style={{alignSelf: "center", color: "green", fontSize: wp("4%"), fontWeight: "bold", paddingLeft: wp("3%")}}>{item.date}</Text>
            </View>
            {item.status === "Pending" ? <View style={styles.cart}>
              <Zocial name="statusnet" size={25} style={{color: "white", alignSelf: "center"}}/>
              <Text style={{alignSelf: "center", color: "white", fontSize: wp("4%"), fontWeight: "bold", paddingLeft: wp("3%")}}>{item.status}</Text>
            </View>:
            item.status === "Accepted" ? <View style={[styles.cart, {backgroundColor: "green"}]}>
            <Zocial name="statusnet" size={25} style={{color: "white", alignSelf: "center"}}/>
            <Text style={{alignSelf: "center", color: "white", fontSize: wp("4%"), fontWeight: "bold", paddingLeft: wp("3%")}}>{item.status}</Text>
          </View>:
           item.status === "Completed" ? <View style={[styles.cart, {backgroundColor: "green"}]}>
           <Zocial name="statusnet" size={25} style={{color: "white", alignSelf: "center"}}/>
           <Text style={{alignSelf: "center", color: "white", fontSize: wp("4%"), fontWeight: "bold", paddingLeft: wp("3%")}}>{item.status}</Text>
         </View>:
         <View style={styles.cart}>
         <Zocial name="statusnet" size={25} style={{color: "white", alignSelf: "center"}}/>
         <Text style={{alignSelf: "center", color: "white", fontSize: wp("4%"), fontWeight: "bold", paddingLeft: wp("3%")}}>{item.status}</Text>
       </View>}
          </View>
 
          <View style={{flexDirection: "row"}}>
          
            <TouchableOpacity activeOpacity={.8} style={styles.date} onPress={()=>callme(item.ownerPhoneNumber)}>
              <Feather name="phone-call" size={25} style={{color: "green", alignSelf: "center", marginLeft: wp("3%")}}/>
              <Text style={{alignSelf: "center", color: "green", fontSize: wp("4%"), fontWeight: "bold", paddingLeft: wp("5%")}}>Call</Text>
              </TouchableOpacity>
            <View>
            <TouchableOpacity activeOpacity={.8} style={styles.date} onPress={()=>addId(item._id, item.ownerName, item.requestorName, props)}>
              <Entypo name="chat" size={25} style={{color: "green", alignSelf: "center",  marginLeft: wp("3%")}}/>
              <Text style={{alignSelf: "center", color: "green", fontSize: wp("4%"), fontWeight: "bold", paddingLeft: wp("5%")}}>Chat</Text>
            </TouchableOpacity>
            {!item.buyerCounts ? null : <View style={styles.alert}><Text style={{color: "white", fontWeight: "bold"}}>{item.buyerCounts}</Text></View>} 
            </View> 
          </View>

        </View>
    
      )
    }}
  /></View> }
   </ScrollView>
    </View>
    </ImageBackground>
    
    </SafeAreaView>
  )
};

AllRequests.navigationOptions = ({navigation}) => {
  return{
  
    headerLeft: ()=> 
    <FontAwesome style={{paddingLeft: wp("25%"), color: "green"}} name="shopping-basket" size={30} />,
  title: "My Requests",
  headerTitleStyle: {
    paddingLeft: wp("23%"),
    
    color: "green",
    fontSize: hp("2.5%"),
    fontStyle: "italic"
  },
  headerStyle: {
    backgroundColor: "white"
  }
  
}
}


const styles = StyleSheet.create({
  text: {
    fontSize: wp("7%"),
    paddingTop: hp("0%"),
    color: "white"
  },
  
  image: {
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
    width: wp("78%"),
    height: hp("40%"),
    marginHorizontal: wp("3%"),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  title: {
    marginLeft: wp("7.5%"),
    marginRight: wp("7.5%"), 
    backgroundColor: "rgba(238,238,238, 0.6)", 
    marginTop: hp("2p%"),
    marginBottom: hp("2%"), 
    borderRadius: 12,
    height: hp("74.5%"),
    width: wp("85%")
  }, 
  price:{
    height: hp("6%"), 
    borderColor: "#C3C3C3",
    borderRadius: 10,
   backgroundColor: "#797979",
    borderWidth: 1,
    width: wp("78%"),
    justifyContent: "center",
    marginBottom: hp("2p%"),
    marginHorizontal: wp("3%"),
    marginTop: hp("1%")
  },
  cart: {
    height: hp("6%"), 
    borderColor: "#C3C3C3",
    borderRadius: 10,
   backgroundColor: "red",
    borderWidth: 1,
    width: wp("36%"),
    justifyContent: "center",
    marginBottom: hp("2p%"),
    flexDirection: "row",
    marginHorizontal: wp("3%"),
    
  },
  date: {
    height: hp("6%"), 
    borderColor: "green",
    borderRadius: 10,
   backgroundColor: "white",
    borderWidth: 1,
    width: wp("36%"),
    paddingLeft: wp("3%"),
    // justifyContent: "center",
    marginBottom: hp("2p%"),
    flexDirection: "row",
    marginHorizontal: wp("3%"),
    
  },
  alert:{
    backgroundColor: "green",
    color: "white",
    marginLeft: wp("31%"),  
    width: wp("10%"),
    height: hp("5%"),  
    borderRadius: 100, 
    alignItems: "center",
    justifyContent: "center",
    //
    bottom: hp("6%")  
      
  },

  overlay: {
    flex: 1,
   
    
    // alignItems: "center",
    //backgroundColor: "rgba(248, 248, 248, .2)",
    // backgroundColor: "rgba(0, 104, 58, .3)", 
    justifyContent: "center"
}
});

export default AllRequests
