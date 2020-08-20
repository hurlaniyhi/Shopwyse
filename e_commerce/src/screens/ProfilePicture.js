import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native";
import {SafeAreaView} from 'react-navigation'
import {Entypo} from '@expo/vector-icons'
import AuthContext from "../context/AuthContext"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

import {NavigationEvents} from 'react-navigation'



const UploadDP = ({navigation}) => {
  
  
  const {state, selectImage, uploadDp, clearUploadProduct} = useContext(AuthContext)
 
 
 
 

  return (
    <SafeAreaView forceInset={{top: "always"}} style={{flex: 1}}>
      <ScrollView>
      <NavigationEvents onWillFocus={clearUploadProduct}/>
      <Text style={styles.text}>Change Profile Picture</Text>
      <Text style={{textAlign: "center", fontSize: wp("3"), fontStyle: "italic", color: "#595757",  paddingBottom: hp("5%")}}>select a selfie picture for your DP</Text>
    
     <TouchableOpacity style={styles.container} onPress={selectImage}>
       {state.uri ?<Image style={styles.image} source={{uri: state.uri}} /> : 
       <Text style={{fontSize: wp("4%"), fontWeight: "bold", fontStyle: "italic", color: "#797979"}}>Tap to select profile picture</Text>}
      </TouchableOpacity>
    
     
      <TouchableOpacity style={styles.button} onPress={()=>uploadDp(state.photo)}>
            {!state.submitting ?<Text style={{fontSize: wp("5%"), color: "white"}}>Upload Picture</Text> : 
            <View style={{flexDirection: "row", justifyContent: "center"}}>
              <Text style={{fontSize: wp("5%"), color: "white"}}>Uploading    </Text>
            <ActivityIndicator color="whitesmoke" size="large"/>
            </View> }
        </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  )
};

UploadDP.navigationOptions = {
  title: "Upload Profile Picture",
  drawerIcon: ({tintColor})=> <Entypo color={tintColor}  name="upload" size={20} />,
  
}

const styles = StyleSheet.create({
  text: {
    fontSize: wp("7%"),
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: hp("4%"),
   
    color: "green"
  },
  image: {
    width: wp("80%"),
    height: hp("60%")
  },
  container: {
    marginHorizontal: wp("10%"), 
    marginBottom: hp("1%"),
    marginTop: hp("3%"),
    width: wp("80%"),
    height: hp("60%"),
    backgroundColor: "whitesmoke",
    borderColor: "#C3C3C3",
    borderWidth: 1,
    justifyContent: "center", 
    alignItems: "center",
    borderRadius: 10,
  },
  button:{
    flexDirection: "row",
    justifyContent: "center", 
    alignItems: "center",
    height: hp("8%"), 
    backgroundColor: "green",
    marginHorizontal: wp("10%"),
    borderRadius: 10,
    marginTop: hp("2p%")
  },
  textInput: {
    borderWidth: 1,
    height: hp("7%"),
    marginBottom: hp("2%"),
    paddingLeft: wp("3%"),
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    marginHorizontal: wp("10%"),
    borderColor: "#C3C3C3",
    textAlign: "center"
},
});

export default UploadDP;
