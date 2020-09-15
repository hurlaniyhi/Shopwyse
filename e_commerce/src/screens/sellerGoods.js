import React, {useState,useContext} from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, Button, ScrollView ,
   FlatList, ImageBackground, ActivityIndicator, YellowBox} from "react-native";
import {SafeAreaView} from 'react-navigation'
import {Zocial} from '@expo/vector-icons'
import {EvilIcons} from '@expo/vector-icons'
import {FontAwesome, Feather, Entypo, AntDesign} from '@expo/vector-icons'
import {NavigationEvents} from 'react-navigation'
import tradeApi from "../API/tradeApi"
import AuthContext from "../context/AuthContext"


import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'



// use expo install expo-image-picker  to install expo image picker
import * as ImagePicker from 'expo-image-picker'



const SellerGoods = (props) => {

  const {state, clearErrorMessage, fetchMyGoods, deleteGoods} = useContext(AuthContext)
  

  YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
  ])


  return (
    <SafeAreaView style={{flex: 1,  backgroundColor: "rgba(196, 194, 194",}}>
      <NavigationEvents onWillFocus={fetchMyGoods}/>
    
    
   
    
   
    <ImageBackground 
    source={{uri: "https://i.insider.com/5e9a0f4bb3b0920f7361c296?width=1100&format=jpeg&auto=webp"}}
    style={{height: hp("100%"), width: wp("100%")}}> 

    
    
    <View style={styles.overlay}>
    <ScrollView style={{flex: 1}}>
   
   {!state.myProducts ? <ActivityIndicator size="large" style={{marginTop: 200}} /> : <View style={{marginBottom: hp("8%")}}><FlatList
    data={state.myProducts}
    keyExtractor={(item) => item._id}
    renderItem={({item}) => {
      return (

        <View style={styles.title}>
          <View>
          <View style={{flexDirection: "row", justifyContent: "center"}}>  
          <Text style={{color: "#595757",fontSize: wp("4%"), alignSelf: "center"}}>{item.goodName}</Text>
          <TouchableOpacity onPress={()=>props.navigation.navigate("EditGood",{
            data: {
              id: item._id,
              image: item.image,
              goodName: item.goodName,
              price: item.price,
              likes: item.likes,
              likeColor: item.likeColor,
              category: item.category
            }
          })}>
          <EvilIcons name="pencil" size={35} style={{marginLeft: wp("4%"), color: "#595757"}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>deleteGoods(item._id)}>
            <FontAwesome name="trash-o" size={25} style={{marginLeft: wp("1%"), color: "#595757"}}/>
            </TouchableOpacity>
          </View>

          <Image style={styles.image} source={{uri: item.image}} /> 
          <View style={styles.price}><Text style={{alignSelf: "center", color: "white", fontSize: wp("5%")}}>{`NGN ${item.price}`}</Text></View>
          </View>

          <View style={{flexDirection: "row"}}>
            <Text style={{color: "#797979", fontSize: wp("4%"), alignSelf: "center", paddingLeft: wp("4%")}}>{`${item.likes} likes`}</Text>
            <AntDesign name="hearto" style={{color: "#797979", marginLeft: wp("3%")}} size={27} />
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

SellerGoods.navigationOptions = ({navigation}) => {
  return{
  
    headerLeft: ()=> 
    <FontAwesome style={{paddingLeft: wp("25%"), color: "green"}} name="shopping-bag" size={30} />,
  title: "My Products",
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
    width: wp("68%"),
    height: hp("43%"),
    marginHorizontal: wp("3%"),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  title: {
    
    backgroundColor: "rgba(238,238,238, 0.6)", 
    marginTop: hp("2p%"),
    marginBottom: hp("2%"), 
    borderRadius: 12,
    //height: hp("70%"),
    width: wp("74%"),
    paddingVertical: hp("1%"),
    marginHorizontal: wp("13%")
  }, 
  price:{
    //height: hp("6%"), 
    borderColor: "#C3C3C3",
    borderRadius: 10,
   backgroundColor: "#797979",
    borderWidth: 1,
    width: wp("68%"),
    justifyContent: "center",
    marginBottom: hp("1p%"),
    marginHorizontal: wp("3%"),
    //marginTop: hp("1%"),
    paddingVertical: hp(".5%")
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

  overlay: {
    flex: 1,
   
    
    // alignItems: "center",
    //backgroundColor: "rgba(248, 248, 248, .2)",
    // backgroundColor: "rgba(0, 104, 58, .3)", 
    justifyContent: "center"
}
});

export default SellerGoods
