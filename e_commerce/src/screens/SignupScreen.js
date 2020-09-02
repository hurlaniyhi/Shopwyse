import React, {useState, useContext} from "react";
import {StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Picker } from "react-native";
import {SafeAreaView} from 'react-navigation'
import {Text, Button} from 'react-native-elements'
import { View } from "native-base";
import AuthContext from "../context/AuthContext"
import {FontAwesome, AntDesign} from '@expo/vector-icons'
import Modal from 'react-native-modal'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen'

import {NavigationEvents} from 'react-navigation'


const SignUp = (props) => {
  const {state, signup, clearErrorMessage, dashboard} = useContext(AuthContext)
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    const [password,setPassword] = useState("")
    const [userType, setUserType] = useState("")
    const [color, setColor] = useState("#C3C3C3")

    const selectChange = (item) => {
      setUserType(item)
      setColor("black")
      if(item == ""){
        setColor("#C3C3C3")
      }
    }


  return (
    <SafeAreaView forceInset={{top: "always"}} style={{flex: 1}}>
    <ScrollView>
    <NavigationEvents onWillFocus={clearErrorMessage}/>
     <Text h4 style={styles.text}>Sign Up</Text>
     <Text style={{textAlign: "center", paddingBottom: hp("5%"), paddingTop: hp("1%")}}>Easily create ShopWyze account</Text>
     <View style={{marginHorizontal: wp("10%")}}>
     <Text style={styles.label}>Username</Text>
        <TextInput 
            style={styles.textInput} 
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter Username"
            onChangeText={(newValue)=> setUsername(newValue)} 
        /> 
        
        <Text style={styles.label}>Email</Text>
        <TextInput 
            style={styles.textInput} 
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter Email"
            onChangeText={(newValue)=> setEmail(newValue)} 
        /> 

        <Text style={styles.label}>Phone Number</Text>
        <TextInput 
            style={styles.textInput} 
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter Phone Number"
            onChangeText={(newValue)=> setPhoneNumber(newValue)} 
        /> 
        <Text style={styles.label}>User Type</Text>
        <View style={styles.textInput}>    
          <Picker 
            selectedValue={userType}
            style={{color: color}}
            onValueChange={(itemValue) =>selectChange(itemValue)}
            placeholder={{label: "Great", value: "yea"}}
    
          >
      <Picker.Item label="Select user type" value=""/>
      <Picker.Item label="Buyer" value="buyer"/>
      <Picker.Item label="Seller" value="seller" />
    </Picker>
    </View>
               
        <Text style={styles.label}>Password</Text>
            <TextInput 
                secureTextEntry
                style={styles.textInput} 
                autoCapitalize="none"
                autoCorrect={false} 
                placeholder="Enter Password"
                onChangeText={(newValue)=> setPassword(newValue)}
            />

        {state.errorMessage ? <Text style={{textAlign: "center", color: "red"}}>{state.errorMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={()=>signup(username, email, phoneNumber, userType, password, props)}>
        {!state.submitting ?<Text style={{fontSize: wp("5%"), color: "white"}}>Sign Up</Text> : 
            <View style={{flexDirection: "row", justifyContent: "center"}}>
              <Text style={{fontSize: wp("5%"), color: "white"}}>Sending   </Text>
            <ActivityIndicator color="whitesmoke" size="large"/>
            </View> }
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=> props.navigation.navigate("Signin")}>
            <Text style={{textAlign: "center", color: "green", paddingTop: hp("2%")}}>Already have an account?   Login in</Text>
        </TouchableOpacity>
      </View>

      <Modal 
        isVisible={state.isCart}
        onBackdropPress={()=>dashboard(state.userType, props)}
        swipeDirection="right"
        animationIn="slideInUp" 
        animationOut="slideOutUp"
        onSwipeComplete={()=>dashboard(state.userType, props)}
        style={styles.modal}
    
        > 
        <View style={{bottom: hp("9%")}}>
       <AntDesign name="checkcircle" size={wp("17%")} color = "white" style={{color: "green"}} />
       <FontAwesome name="circle" size={wp("17%")} color="white" style={{position: "absolute", right: wp("1%"), zIndex: -1}}/>
        </View>
          <Text style={{fontSize: wp("7%"), bottom: hp("7%"), color: "green", fontWeight: "bold"}}>Awesome!</Text>
          <Text style={{fontSize: wp("4.2%"),color: "#BDBDBD", bottom: hp("3%"), paddingBottom: hp("6%"), textAlign: "center" }}>
            Your account has been created!
          </Text> 
          <TouchableOpacity style={styles.modaltext} onPress={()=>dashboard(state.userType, props)}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: wp("4.2%")}}>Dive In</Text>
          </TouchableOpacity>
        
        </Modal>
      </ScrollView>
    </SafeAreaView>
  )
};


SignUp.navigationOptions ={
    headerShown: null 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 200
      },
      label: {
        fontSize: wp("3.2%"),
        fontWeight: "bold",
        paddingBottom: hp("0.7%"),
        paddingLeft: wp("2%")
    },
      textInput: {
        borderWidth: 1,
        height: hp("7%"),
        marginBottom: hp("3%"),
        paddingLeft: wp("3%"),
        backgroundColor: "whitesmoke",
        borderRadius: 10,
        borderColor: "#C3C3C3"
    },
    text:{

      paddingTop: hp("3%"),
      textAlign: "center",
      color: "green"
    }, 
    button:{
        justifyContent: "center", 
        alignItems: "center",
        height: hp("7%"), 
        backgroundColor: "green",
        borderRadius: 10,
        marginTop: hp("2p%")
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

export default SignUp;
