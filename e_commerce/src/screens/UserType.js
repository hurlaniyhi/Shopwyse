import React, {useState} from "react";
import {StyleSheet, TextInput, TouchableOpacity, ScrollView, ImageBackground, AsyncStorage } from "react-native";
import {SafeAreaView} from 'react-navigation'
import {Text, Button} from 'react-native-elements'
import { View } from "native-base";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen'
  



const UserType = ({navigation}) => {


    
    
// https://s17026.pcdn.co/wp-content/uploads/sites/9/2017/03/Buying-and-selling-a-business.jpeg

// https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator-usa.com/news/markets/fmi-us-grocery-shoppers-frequent-more-stores-per-month/9942638-1-eng-GB/FMI-US-grocery-shoppers-frequent-more-stores-per-month.jpg

  return (
    <SafeAreaView forceInset={{top: "always"}} style={{flex: 1}}>
    <ScrollView>
     <ImageBackground style={{flex: 1, height: hp("100%"), width: wp("100%")}} 
     source={require("../../startupImage.jpg")}>
     <View style={styles.overlay}>
      <View style={{marginHorizontal: wp("10%")}}>
    <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Signin', {
        userType: "seller"
    })}>
            <Text style={{fontSize: wp("6%"), fontStyle: "italic", color: "white"}}>I am a Seller</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Signin', {
            userType: "buyer"
        })}>
            <Text style={{fontSize: wp("6%"), color: "white", fontStyle: "italic"}}>I am a Buyer</Text>
        </TouchableOpacity>
      </View>  
      </View>
     </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  )
};


UserType.navigationOptions ={
    headerShown: null 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 200
      },

    text:{

      paddingTop: hp("8%"),
      textAlign: "center",
      color: "green"
    }, 
    button:{
        justifyContent: "center", 
        alignItems: "center",
        height: hp("13%"), 
        backgroundColor: "rgba(0, 104, 58, .7)",
        borderRadius: 25,
        marginTop: hp("5p%"), 
        borderColor: "white",
         borderWidth: 1
    },
    overlay: {
        flex: 1,
        // backgroundColor: "rgba(238,238,238, .5)"
        backgroundColor: "rgba(0, 104, 58, .3)", justifyContent: "center"
    }
});

export default UserType;
