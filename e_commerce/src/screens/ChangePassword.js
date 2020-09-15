import React, { useState, useContext } from "react";
import { StyleSheet, View, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native";
import {SafeAreaView} from 'react-navigation'
import {Entypo, AntDesign, FontAwesome} from '@expo/vector-icons'
import AuthContext from "../context/AuthContext"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

import {Text, Button} from 'react-native-elements'
import Modal from 'react-native-modal'


const ChangePassword = (props) => {
  
  
  const [code,setCode] = useState("")
  const [password,setPassword] = useState("")
  
  

  const {state, signin, clearErrorMessage, changePassword, StopModal} = useContext(AuthContext)
 
  const okay = async() =>{
    await StopModal()
    props.navigation.navigate("Signin")
  } 
  

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
    <Modal 
        isVisible={state.isCart}
        onBackdropPress={()=>okay()}
        swipeDirection="right"
        animationIn="slideInUp" 
        animationOut="slideOutUp"
        onSwipeComplete={()=>okay()}
        style={styles.modal2}
    
        > 
        <View style={{bottom: hp("9%")}}>
       <AntDesign name="checkcircle" size={wp("17%")} color = "white" style={{color: "green"}} />
       <FontAwesome name="circle" size={wp("17%")} color="white" style={{position: "absolute", right: wp("1%"), zIndex: -1}}/>
        </View>
          <Text style={{fontSize: wp("7%"), bottom: hp("7%"), color: "green", fontWeight: "bold"}}>Awesome!</Text>
          <Text style={{fontSize: wp("4.5%"),color: "#BDBDBD", bottom: hp("3%"), paddingBottom: hp("6%"), textAlign: "center" }}>
            Password successfully changed!
          </Text> 
          <TouchableOpacity activeOpacity={.8} style={styles.modaltext2} onPress={()=>okay()}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: wp("4.2%")}}>OK</Text>
          </TouchableOpacity>
        
        </Modal>

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
},
modaltext2: {
  height: hp("6%"),
  backgroundColor: "green",
  width: wp("60%"),
  justifyContent: "center",
  alignItems: "center",
  
  borderRadius: 10
  
}, 
modal2: {
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

export default ChangePassword;
