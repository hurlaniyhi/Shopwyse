import React, {useState, useContext} from "react";
import {StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import {SafeAreaView} from 'react-navigation'
import {Text, Button} from 'react-native-elements'
import { View } from "native-base";
import AuthContext from "../context/AuthContext"
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen'

import {NavigationEvents} from 'react-navigation'


const SignUp = (props) => {
  const {state, signup, clearErrorMessage} = useContext(AuthContext)
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    const [password,setPassword] = useState("")


  return (
    <SafeAreaView forceInset={{top: "always"}} style={{flex: 1}}>
    <ScrollView>
    <NavigationEvents onWillFocus={clearErrorMessage}/>
     <Text h4 style={styles.text}>Sign Up</Text>
     <Text style={{textAlign: "center", paddingBottom: hp("10%"), paddingTop: hp("1%")}}>Easily create ShopWyze account</Text>
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

        <TouchableOpacity style={styles.button} onPress={()=>signup(username, email, phoneNumber, password, props)}>
        {!state.submitting ?<Text style={{fontSize: wp("5%"), color: "white"}}>Sign Up</Text> : 
            <View style={{flexDirection: "row", justifyContent: "center"}}>
              <Text style={{fontSize: wp("5%"), color: "white"}}>Sending    </Text>
            <ActivityIndicator color="whitesmoke" size="large"/>
            </View> }
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=> props.navigation.navigate("Signin")}>
            <Text style={{textAlign: "center", color: "green", paddingTop: hp("2%")}}>Already have an account?   Login in</Text>
        </TouchableOpacity>
      </View>
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
        marginBottom: hp("4%"),
        paddingLeft: wp("3%"),
        backgroundColor: "whitesmoke",
        borderRadius: 10,
        borderColor: "#C3C3C3"
    },
    text:{

      paddingTop: hp("6%"),
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
    }
});

export default SignUp;
