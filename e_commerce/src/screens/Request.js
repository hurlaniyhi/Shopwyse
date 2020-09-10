import React, {useState,useContext} from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, Button, ScrollView ,
   FlatList, ImageBackground, ActivityIndicator} from "react-native";
import {SafeAreaView} from 'react-navigation'
import {Feather} from '@expo/vector-icons'

import {FontAwesome, AntDesign} from '@expo/vector-icons'
import {NavigationEvents} from 'react-navigation'

import AuthContext from "../context/AuthContext"
import call from 'react-native-phone-call'
import Modal from 'react-native-modal'

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'



// use expo install expo-image-picker  to install expo image picker
import * as ImagePicker from 'expo-image-picker'



const Request = (props) => {

  const {state, order, clearErrorMessage, Add_cart, StopModal} = useContext(AuthContext)
  
  const data = props.navigation.getParam("data")

  const callme = (phoneNumber) => {
    const args = {
      number: phoneNumber,
      prompt: false,
    }
    call(args).catch(console.log(console.error()))
  }


  return (
    <SafeAreaView  style={{flex: 1}}>
    <ScrollView>
        <View style={styles.container}>
        <NavigationEvents onWillFocus={clearErrorMessage}/>
       
          <Text style={{textAlign: "center", color: "#797979", fontSize: wp("6%"), fontWeight: "bold", paddingTop: hp("3%")}}>{data.goodName}</Text>
          <Image style={styles.image} source={{uri: data.image}} /> 
          <View style={styles.price}>
              <Text style={{alignSelf: "center", color: "white", fontSize: wp("6%")}}>{`NGN ${data.price}`}</Text>
          </View>
          <View style={{flexDirection: "row"}}>
            <TouchableOpacity activeOpacity={.8} onPress={()=> Add_cart(data.image, data.goodName, data.ownerName, data.price, data.phoneNumber)}>
            <View style={styles.cart}>
            {!state.carting ?<View style={{flexDirection:"row"}}>
              <FontAwesome name="shopping-cart" size={25} style={{color: "white", alignSelf: "center"}}/>
              <Text style={{alignSelf: "center", color: "white", fontSize: wp("4%"), fontWeight: "bold", paddingLeft: wp("3%")}}>Add to cart</Text></View>:
            <View style={{flexDirection: "row", justifyContent: "center",}}>
            <Text style={{fontSize: wp("5%"), color: "white", alignSelf: "center"}}>Adding  </Text>
          <ActivityIndicator color="whitesmoke" size="large"/>
          </View> }
            </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8} onPress={()=> order(data.image, data.goodName, data.ownerName, data.price, data.phoneNumber)}>
            <View style={styles.request}>
            {!state.submitting ?<View style={{flexDirection:"row"}}>
                <FontAwesome name="shopping-bag" size={25} style={{color: "white", alignSelf: "center"}}/>
              <Text style={{alignSelf: "center", color: "white", fontSize: wp("4%"), fontWeight: "bold", paddingLeft: wp("3%")}}>Request</Text></View>: 
            <View style={{flexDirection: "row", justifyContent: "center",}}>
              <Text style={{fontSize: wp("5%"), color: "white", alignSelf: "center"}}>Ordering  </Text>
            <ActivityIndicator color="whitesmoke" size="large"/>
            </View> }
            </View>
            </TouchableOpacity>
           </View>
           <TouchableOpacity activeOpacity={.8} onPress={()=> callme(data.phoneNumber)}>
           <View style={styles.call}>
            <Feather name="phone-call" size={30} style={{color: "green", alignSelf: "center"}}/>
              <Text style={{alignSelf: "center", color: "green", fontSize: wp("5%"), fontWeight: "bold", paddingLeft: wp("6%")}}>Call Seller</Text>
            </View>
            </TouchableOpacity>
        </View> 

        <Modal 
        isVisible={state.isPoped}
        onBackdropPress={()=>StopModal()}
        swipeDirection="right"
        animationIn="slideInUp" 
        animationOut="slideOutUp"
        onSwipeComplete={()=>StopModal()}
        style={styles.modal}
    
        > 
        <View style={{bottom: hp("9%")}}>
       <AntDesign name="checkcircle" size={wp("17%")} color = "white" style={{color: "green"}} />
       <FontAwesome name="circle" size={wp("17%")} color="white" style={{position: "absolute", right: wp("1%"), zIndex: -1}}/>
        </View>
          <Text style={{fontSize: wp("7%"), bottom: hp("7%"), color: "green", fontWeight: "bold"}}>Success!</Text>
          <Text style={{fontSize: wp("4%"),color: "#BDBDBD", bottom: hp("3%"), paddingBottom: hp("6%") }}>
            The product has been ordered!
          </Text> 
          <TouchableOpacity activeOpacity={.8} style={styles.modaltext} onPress={()=>StopModal()}>
              <Text style={{color: "white", fontWeight: "bold"}}>OK</Text>
          </TouchableOpacity>
        
        </Modal>

        <Modal 
        isVisible={state.isCart}
        onBackdropPress={()=>StopModal()}
        swipeDirection="right"
        animationIn="slideInUp" 
        animationOut="slideOutUp"
        onSwipeComplete={()=>StopModal()}
        style={styles.modal}
    
        > 
        <View style={{bottom: hp("9%")}}>
       <AntDesign name="checkcircle" size={wp("17%")} color = "white" style={{color: "green"}} />
       <FontAwesome name="circle" size={wp("17%")} color="white" style={{position: "absolute", right: wp("1%"), zIndex: -1}}/>
        </View>
          <Text style={{fontSize: wp("7%"), bottom: hp("7%"), color: "green", fontWeight: "bold"}}>Success!</Text>
          <Text style={{fontSize: wp("4%"),color: "#BDBDBD", bottom: hp("3%"), paddingBottom: hp("6%"), textAlign: "center" }}>
            The product has been added to your cart!
          </Text> 
          <TouchableOpacity activeOpacity={.8} style={styles.modaltext} onPress={()=>StopModal()}>
              <Text style={{color: "white", fontWeight: "bold"}}>OK</Text>
          </TouchableOpacity>
        
        </Modal>
     </ScrollView>
    </SafeAreaView>
  )
};

Request.navigationOptions = ({navigation}) => {
  return{
   
    title: "Order Product",
    headerTitleStyle: {
      paddingLeft: wp("18%"),
      color: "green",
      fontSize: hp("2.5%"),
      fontStyle: "italic"
    },
    headerTintColor: "green",
    headerStyle: {
      backgroundColor: "white"
    },
    
}
}
const styles = StyleSheet.create({
  text: {
    fontSize: wp("7%"),
    paddingTop: hp("0%"),
    color: "white"
  },
  container: {
    
    marginHorizontal: wp("5%")
  },
  image: {
    
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
    marginHorizontal: wp("6%"),
    width: wp("78%"),
    height: hp("50%"),
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
    marginHorizontal: wp("9%")
    
  },
  cart: {
    height: hp("7.5%"), 
    borderColor: "#C3C3C3",
    borderRadius: 10,
   backgroundColor: "red",
    borderWidth: 1,
    width: wp("42.5%"),
    justifyContent: "center",
    marginBottom: hp("2p%"),
    flexDirection: "row"
    
  },
  request: {
    height: hp("7.5%"), 
    borderColor: "#C3C3C3",
    borderRadius: 10,
   backgroundColor: "#046007",
    borderWidth: 1,
    width: wp("42.5%"),
    justifyContent: "center",
    marginBottom: hp("2p%"),
    marginLeft: wp("5%"), 
    flexDirection: "row"
    
  },
  call: {
    height: hp("7.5%"), 
    borderColor: "green",
    borderRadius: 10,
   backgroundColor: "white",
    borderWidth: 1,
    width: wp("60%"),
    // justifyContent: "center",
    marginBottom: hp("2p%"),
    marginHorizontal: wp("15%"), 
    flexDirection: "row",
    marginTop: hp("3%"),
    paddingLeft: wp("7%")
    
    
  },
  modaltext: {
    height: hp("6%"),
    backgroundColor: "green",
    width: wp("60%"),
    justifyContent: "center",
    alignItems: "center",
    
    borderRadius: 10
    
  }, 
  modal: {
    // justifyContent: "center",
    alignItems: "center",
    // height: 50,
    marginHorizontal: wp("10%"),
    marginTop: hp("26%"),
    maxHeight: hp("40%"),
    backgroundColor: "white",
    borderRadius: 20,
    flex: 1
  }
  
  
});

export default Request;
