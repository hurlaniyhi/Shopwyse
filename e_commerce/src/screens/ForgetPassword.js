import React, { useState, useContext } from "react";
import { StyleSheet, View, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native";
import {SafeAreaView} from 'react-navigation'
import {Entypo} from '@expo/vector-icons'
import AuthContext from "../context/AuthContext"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

import {Text, Button} from 'react-native-elements'


const ForgetPassword = (props) => {
  
  
  const [email,setEmail] = useState("")
  
  

  const {state, signin, clearErrorMessage, forgetPassword} = useContext(AuthContext)
 
  

return (
  <SafeAreaView forceInset={{top: "always"}} style={{flex: 1}}>
  <ScrollView>
  
   <Text style={styles.text}>Forget Password?</Text>
   
   <View style={{marginHorizontal: wp("10%")}}>
   
      <TextInput 
          style={styles.textInput} 
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter your email"
          onChangeText={(newValue)=> setEmail(newValue)} 
      /> 
         
      <TouchableOpacity style={styles.button} onPress={()=> forgetPassword(email, props)}>
          
      {!state.carting ?<Text style={{fontSize: wp("5%"), color: "white"}}>Submit</Text> : 
          <View style={{flexDirection: "row", justifyContent: "center"}}>
            <Text style={{fontSize: wp("5%"), color: "white"}}>Submitting    </Text>
          <ActivityIndicator color="whitesmoke" size="large"/>
          </View> }
  
      </TouchableOpacity>
      
     
    </View>
    </ScrollView>
  </SafeAreaView>
)
};

ForgetPassword.navigationOptions = {
  headerShown: null
  
}

const styles = StyleSheet.create({
 
  textInput: {
    borderWidth: 1,
    height: hp("7%"),
    marginBottom: hp("4%"),
    paddingLeft: wp("3%"),
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    borderColor: "#C3C3C3"
},
text:{

  paddingTop: hp("47%"),
  paddingLeft: wp("10%"),
  paddingBottom: hp("5%"),
  fontStyle: "italic",
  color: "green",
  fontSize: wp("6%"),
  fontWeight: "bold"
}, 
button:{
  justifyContent: "center", 
  alignItems: "center",
  height: hp("7%"), 
  backgroundColor: "green",
  borderRadius: 10,
  marginTop: hp("1p%")
}
 
});

export default ForgetPassword;
