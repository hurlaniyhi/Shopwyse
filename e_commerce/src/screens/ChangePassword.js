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


const ChangePassword = (props) => {
  
  
  const [code,setCode] = useState("")
  const [password,setPassword] = useState("")
  
  

  const {state, signin, clearErrorMessage, changePassword} = useContext(AuthContext)
 
  

return (
  <SafeAreaView forceInset={{top: "always"}} style={{flex: 1}}>
  <ScrollView>
  
   <Text style={styles.text}>Change Password</Text>
   <Text style={{textAlign: "center", paddingBottom: hp("10%"), paddingTop: hp("0.5%"), fontSize: wp("2.7%")}}>
     A code has been sent to your mail
     </Text>
   
   <View style={{marginHorizontal: wp("10%")}}>
   
      <TextInput 
          secureTextEntry
          style={styles.textInput} 
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter code sent to your mail"
          onChangeText={(newValue)=> setCode(newValue)} 
      /> 

     
            <TextInput 
                secureTextEntry
                style={styles.textInput} 
                autoCapitalize="none"
                autoCorrect={false} 
                placeholder="Enter new password"
                onChangeText={(newValue)=> setPassword(newValue)}
            />
         
      <TouchableOpacity style={styles.button} onPress={()=> changePassword(code, password, props)}>
          
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

ChangePassword.navigationOptions = {
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

  paddingTop: hp("25%"),
  textAlign: "center",
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

export default ChangePassword;
