import React, {useContext} from "react";
import { Text, StyleSheet, View,TouchableOpacity, Image, ImageBackground, ScrollView } from "react-native";
import { Button, Text as Title } from "react-native-elements";
import AuthContext from "../context/AuthContext"

import {SafeAreaView} from 'react-navigation'
import {Entypo} from '@expo/vector-icons'

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen'

import {NavigationEvents} from 'react-navigation'



const Logout = (props) => {

  const {state, signout, userInfo} = useContext(AuthContext)
 

  return (
    <SafeAreaView forceInset={{top: "always"}}>
      <NavigationEvents onWillFocus={userInfo}/>
      <ImageBackground 
    source={{uri: "https://i.insider.com/5e9a0f4bb3b0920f7361c296?width=1100&format=jpeg&auto=webp"}}
    style={{height: hp("100%"), width: wp("100%")}}> 
    <ScrollView>
      <View style={styles.container}>
        <Title h4 style={styles.text}>My Profile</Title>

        <Image style={styles.image} source={{uri: state.Dp}}/>
        
       
       
        {state.goodsUploaded ?
        <View>
        <Text style={styles.content}>{state.username}</Text>
        <Text style={styles.content}>{state.email}</Text>
        <Text style={styles.content}>{state.phoneNumber}</Text>
        <Text style={styles.content}>{state.userType}</Text>
        {state.goodsUploaded ? <Text style={styles.content}>{`You've uploaded ${state.goodsUploaded} good(s)`}</Text>:
        <Text style={styles.content}>{`You've uploaded 0 good(s)`}</Text> }
        {state.receivedOrders ? <Text style={styles.content}>{`${state.receivedOrders} Order(s) received`}</Text> : 
        <Text style={styles.content}>{`0 Order(s) received`}</Text>}
        </View> : 
        <View>
          <Text style={styles.content}>{state.username}</Text>
        <Text style={styles.content}>{state.email}</Text>
        <Text style={styles.content}>{state.phoneNumber}</Text>
        <Text style={styles.content}>{state.userType}</Text>
        {state.orderMade ? <Text style={styles.content}>{`You've made ${state.orderMade} order(s)`}</Text> : 
        <Text style={styles.content}>{`You've made 0 order(s)`}</Text>}
        </View>
        }

        

        <TouchableOpacity style={styles.button} onPress={()=>signout(props)}>
            <Text style={{fontSize: wp("4.5%"), color: "white"}}>LogOut</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
};

Logout.navigationOptions = {
  title: "Profile / LogOut",
  drawerIcon: ({tintColor})=> <Entypo color={tintColor}  name="log-out" size={20} />,
  
}


const styles = StyleSheet.create({
  text: {
    
    textAlign: "center",
    paddingBottom: hp("4%"),
    paddingTop: hp("3%"),
    color: "green"
  },
  content: {
    fontSize: wp("4%"), 
    textAlign: "center",
    paddingBottom: hp("2%"),
    color: "#595757",
    fontWeight: "bold"
  },
  container:{
    backgroundColor: "rgba(238,238,238, 0.6)", 
    marginTop: hp("2p%"),
    marginBottom: hp("2%"), 
    borderRadius: 12,
    marginHorizontal: wp("4%"),
    height: hp("95%"),
  },
  button:{
    justifyContent: "center", 
    alignItems: "center",
    height: hp("7%"), 
    backgroundColor: "green",
    borderRadius: 10,
    marginTop: hp("3p%"),
    marginHorizontal: wp("20%")
},
image: {
  height: wp("50%"),
  width: wp("50%"),
  marginHorizontal: wp("25%"),
  backgroundColor: "whitesmoke",
  borderRadius: 200, 
  marginTop: hp("3%"),
  marginBottom: hp("7%")
  
}
});

export default Logout;
