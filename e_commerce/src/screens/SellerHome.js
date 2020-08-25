import React, {useState,useContext, useEffect} from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, Button, ScrollView ,
   FlatList, ImageBackground, ActivityIndicator} from "react-native";
import {SafeAreaView} from 'react-navigation'
import {Feather} from '@expo/vector-icons'
import {AntDesign} from '@expo/vector-icons'
import {FontAwesome5} from '@expo/vector-icons'
import {NavigationEvents} from 'react-navigation'
import tradeApi from "../API/tradeApi"
import AuthContext from "../context/AuthContext"


import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'



// use expo install expo-image-picker  to install expo image picker
import * as ImagePicker from 'expo-image-picker'
import io from "socket.io-client"


const SellerHome = (props) => {

  const {state, clearErrorMessage, fetchGoods} = useContext(AuthContext)
  const [date, setDate] = useState("")


  const sendlike = () => {

    socket = io("https://shopwyse-backend.herokuapp.com")
    socket.on("likes", msg => {
      fetchGoods()
    })

  }


  useEffect(()=>{

   
    sendlike()
    

  }, [])



  return (
    <SafeAreaView style={{flex: 1,  backgroundColor: "rgba(196, 194, 194",}}>
      <NavigationEvents onWillFocus={fetchGoods}/>
    <ScrollView>

    <View style={styles.container}>
    <ImageBackground style={{flex: 1, height: hp("25%"), width: wp("96%"), marginHorizontal: wp("2%"), marginTop: hp("1%")}} 
     source={require("../../startupImage.jpg")}>
      <View style={styles.overlay}>
      <Text style={styles.text}>{`Good ${state.day} ${state.username}`}</Text>
  <Text style={[styles.text, {fontSize: wp("3.5%"), paddingTop: hp("4%")}]}>{state.date}</Text>
      </View>
      </ImageBackground>
    </View>
    

   {!state.goods ? <ActivityIndicator size="large" style={{marginTop: 200}} /> : <FlatList
    data={state.goods}
    horizontal
    keyExtractor={(item) => item._id}
    renderItem={({item}) => {
      return (
        <View style={styles.title}>
          
          <Image style={styles.image} source={{uri: item.image}} /> 
          <Text style={{textAlign: "center", color: "green", fontSize: wp("5%")}}>{item.goodName}</Text>
          <View style={styles.price}><Text style={{alignSelf: "center", color: "white", fontSize: wp("6%")}}>{`NGN ${item.price}`}</Text></View>
          <View style={{flexDirection: "row"}}>
            <Text style={{color: "#C4C2C2", fontSize: wp("4%"), alignSelf: "center", paddingLeft: wp("5%")}}>{`${item.likes} likes`}</Text>
            <AntDesign name="hearto" style={{color: "#C4C2C2", marginLeft: wp("37%")}} size={30} />
          </View>
        </View>
      )
    }}
  /> }
    
     </ScrollView>
    </SafeAreaView>
  )
};

SellerHome.navigationOptions = ({navigation}) => {
  return{
  drawerIcon: ({tintColor})=><FontAwesome5 color={tintColor} name="home" size={20}/>,
  headerLeft: ()=> <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
      <Feather style={{marginLeft: wp("3%"), color: "green"}} name="menu" size={30} />
      </TouchableOpacity>,
  title: "Market Square",
  headerTitleStyle: {
    paddingLeft: wp("18%"),
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
  container: {
    
    // height: hp("22%"),
    
   
    // borderColor: "#C3C3C3",
    // justifyContent: "center", 
    // alignItems: "center",
    // borderBottomLeftRadius: 80,
    borderTopWidth: 1,
    borderColor: "white"
  },
  image: {
    
    marginBottom: hp("1%"),
    width: wp("70%"),
    height: hp("40%"),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  title: {
    marginLeft: wp("2%"),
    marginRight: wp("2%"), 
    backgroundColor: "white", 
    marginTop: hp("6p%"), 
    borderRadius: 12,
    height: hp("59%"),
    width: wp("70%")
  }, 
  price:{
    height: hp("6%"), 
    borderColor: "#C3C3C3",
    borderRadius: 10,
   backgroundColor: "#797979",
    borderWidth: 1,
    width: wp("70%"),
    justifyContent: "center",
    marginBottom: hp("2p%"),
    marginTop: hp("1%")
  },
  overlay: {
    flex: 1,
    // marginBottom: hp("-3%"),
    // backgroundColor: "rgba(238,238,238, .5)"
    
    alignItems: "center",
    // backgroundColor: "rgba(196, 194, 194, .4)",
    backgroundColor: "rgba(0, 104, 58, .3)", 
    justifyContent: "center"
}
});

export default SellerHome;
