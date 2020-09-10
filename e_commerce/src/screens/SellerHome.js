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
  //const [date, setDate] = useState("")


  const sendlike = () => {

    socket = io("https://shopwyse-backend.herokuapp.com")
    socket.on("likes", msg => {
      fetchGoods()
    })

  }


  useEffect(()=>{

   
    sendlike()
    

  }, [])

  const updateLike = (id) => {
    socket.emit("likes", {username: state.username, id: id})
  }

  return (
    <SafeAreaView style={{flex: 1,  backgroundColor: "rgba(196, 194, 194",}}>
      <NavigationEvents onWillFocus={fetchGoods}/>
    
    
    <View style={styles.container}>
    {!state.imageSwitch ? <ImageBackground style={{height: hp("30%"), width: wp("100%"), marginHorizontal: wp("0%"), marginTop: hp("0%")}} 
     source={require("../../startupImage.jpg")}>
      <View style={styles.overlay}>
      <Text style={[styles.text]}>{`Good ${state.day} ${state.username}`}</Text>
  <Text style={[styles.text, {fontSize: wp("3.5%"), paddingTop: hp("2%"), }]}>{state.date}</Text>
      </View>
      </ImageBackground>: 
      <ImageBackground style={{height: hp("30%"), width: wp("100%"), marginHorizontal: wp("0%"), marginTop: hp("0%")}} 
      source={state.imageSwitch}>
       <View style={styles.overlay}>
       <Text style={[styles.text]}>{`Good ${state.day} ${state.username}`}</Text>
   <Text style={[styles.text, {fontSize: wp("3.5%"), paddingTop: hp("2%")}]}>{state.date}</Text>
       </View>
       </ImageBackground>
      }
    </View>
    

   {!state.goods ? <ActivityIndicator size="large" style={{marginTop: 200, transform: [{scale: 1.5}]}} /> : 
   <View style={{flex: 1, bottom: hp("4%"),
   backgroundColor: "whitesmoke", borderTopLeftRadius: 35, 
   borderTopRightRadius: 35, marginHorizontal: wp("0.4"), overflow: "hidden"}}>
      <Text style={{height: hp("1%")}}></Text>
   <ScrollView>

   {state.categoryOne.length == 0 ? null : 
<>
   <Text style={{fontWeight: "bold", fontSize: wp("5.5%"), 
   textAlign: "center"}}>Electronics
   </Text>  
   <FlatList
    data={state.categoryOne}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item._id}
    renderItem={({item}) => {
      return (
        <View style={styles.title}>
          
          <Image style={styles.image} source={{uri: item.image}} /> 
          {item.goodName.length <= 13 ? 
         <Text style={{textAlign: "center", color: "green", fontSize: wp("4%")}}>{item.goodName}</Text> :
         <Text style={{textAlign: "center", color: "green", fontSize: wp("4%")}}>{`${item.goodName.substring(0,13)}...`}</Text>
         }
          <View style={styles.price}><Text style={{alignSelf: "center", color: "white", fontSize: wp("4%")}}>{`NGN ${item.price}`}</Text></View>
         
          <View style={{flexDirection: "row"}}>
            <Text style={{color: "#C4C2C2", fontSize: wp("4%"), alignSelf: "center", paddingLeft: wp("5%")}}>{`${item.likes} likes`}</Text>
            <TouchableOpacity onPress={()=> updateLike(item._id)}>
            {item.likeColor != "red" ? <AntDesign name="hearto" style={{color: "#C4C2C2", marginLeft: wp("3%")}} size={20} /> : 
            <AntDesign name="heart" style={{color: "red", marginLeft: wp("3%")}} size={20} />}
            </TouchableOpacity>
          </View>
        </View>
      )
    }}
  />
  </>
}

  {state.categoryTwo.length === 0 ? null : 
<>
   <Text style={{fontWeight: "bold", fontSize: wp("5.5%"), 
   textAlign: "center", marginTop: hp("2.5%")}}>
     Clothes & Other wears
   </Text>  
  <FlatList
    data={state.categoryTwo}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item._id}
    renderItem={({item}) => {
      return (
        <View style={styles.title}>
         
          <Image style={styles.image} source={{uri: item.image}} /> 
          {item.goodName.length <= 13 ? 
         <Text style={{textAlign: "center", color: "green", fontSize: wp("4%")}}>{item.goodName}</Text> :
         <Text style={{textAlign: "center", color: "green", fontSize: wp("4%")}}>{`${item.goodName.substring(0,13)}...`}</Text>
         }
          <View style={styles.price}><Text style={{alignSelf: "center", color: "white", fontSize: wp("4%")}}>{`NGN ${item.price}`}</Text></View>
          
          <View style={{flexDirection: "row"}}>
            <Text style={{color: "#C4C2C2", fontSize: wp("4%"), alignSelf: "center", paddingLeft: wp("5%")}}>{`${item.likes} likes`}</Text>
            <TouchableOpacity onPress={()=> updateLike(item._id)}>
            {item.likeColor != "red" ? <AntDesign name="hearto" style={{color: "#C4C2C2", marginLeft: wp("3%")}} size={20} /> : 
            <AntDesign name="heart" style={{color: "red", marginLeft: wp("3%")}} size={20} />}
            </TouchableOpacity>
          </View>
        </View>
      )
    }}
  />
  </>
}

{state.categoryThree.length == 0 ? null : 
<>
<Text style={{fontWeight: "bold", fontSize: wp("5.5%"), 
   textAlign: "center", marginTop: hp("2.5%")}}>
     Others 
   </Text>  
  <FlatList
    data={state.categoryThree}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item._id}
    renderItem={({item}) => {
      return (
        <View style={styles.title}>
          
          <Image style={styles.image} source={{uri: item.image}} /> 
         {item.goodName.length <= 13 ? 
         <Text style={{textAlign: "center", color: "green", fontSize: wp("4%")}}>{item.goodName}</Text> :
         <Text style={{textAlign: "center", color: "green", fontSize: wp("4%")}}>{`${item.goodName.substring(0,13)}...`}</Text>
         }
          <View style={styles.price}><Text style={{alignSelf: "center", color: "white", fontSize: wp("4%")}}>{`NGN ${item.price}`}</Text></View>
          
          <View style={{flexDirection: "row"}}>
            <Text style={{color: "#C4C2C2", fontSize: wp("4%"), alignSelf: "center", paddingLeft: wp("5%")}}>{`${item.likes} likes`}</Text>
            <TouchableOpacity onPress={()=> updateLike(item._id)}>
            {item.likeColor != "red" ? <AntDesign name="hearto" style={{color: "#C4C2C2", marginLeft: wp("3%")}} size={20} /> : 
            <AntDesign name="heart" style={{color: "red", marginLeft: wp("3%")}} size={20} />}
            </TouchableOpacity>
          </View>
        </View>
      )
    }}
  />
  </>
  }

  </ScrollView>
  </View>
  }
    
    
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
      color: "white",
      backgroundColor: "rgba(0, 104, 58, .3)"
      
    },
    container: {
      
     
      borderTopWidth: 1,
      borderColor: "white"
    },
    image: {
      
      marginBottom: hp("0.5%"),
      width: wp("37%"),
      height: hp("20%"),
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12
    },
    title: {
      marginLeft: wp("2%"),
      marginRight: wp("2%"), 
      backgroundColor: "white", 
      marginTop: hp("1.5%"), 
      borderRadius: 12,
      //height: hp("59%"),
      borderWidth: 1,
      borderColor: "rgba(196,194,194,0.4)",
      width: wp("37%"),
      flex: 1,
    }, 
    price:{
      //height: hp("4%"), 
      borderColor: "#C3C3C3",
      borderRadius: 10,
     backgroundColor: "#797979",
      borderWidth: 1,
      marginHorizontal: wp("1%"),
      width: wp("35%"),
      justifyContent: "center",
      marginBottom: hp("1p%"),
      marginTop: hp("0.5%")
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
