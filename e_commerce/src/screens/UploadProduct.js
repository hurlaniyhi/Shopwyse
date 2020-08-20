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



const UploadProduct = ({navigation}) => {

  const [productName, setProductName] = useState("")
  const [price, setPrice] = useState("")
  
  
  const {state, clearErrorMessage, selectImage, uploadProduct, clearUploadProduct} = useContext(AuthContext)
 
 
 
 

  return (
    <SafeAreaView forceInset={{top: "always"}} style={{flex: 1}}>
      <ScrollView>
      <NavigationEvents onWillFocus={clearErrorMessage, clearUploadProduct}/>
      <Text style={styles.text}>Product Upload</Text>
      <TextInput 
                
                style={styles.textInput} 
                autoCapitalize="none"
                autoCorrect={false} 
                placeholder="Enter Product Name"
                onChangeText={(newValue)=> setProductName(newValue)}
            />
       <TextInput 
                keyboardType="numeric"
                style={styles.textInput} 
                autoCapitalize="none"
                autoCorrect={false} 
                placeholder="Enter Product Price"
                onChangeText={(newValue)=> setPrice(newValue)}
            />
    
     <TouchableOpacity style={styles.container} onPress={selectImage}>
       {state.uri ?<Image style={styles.image} source={{uri: state.uri}} /> : 
       <Text style={{fontSize: wp("4%"), fontWeight: "bold", fontStyle: "italic", color: "#797979"}}>Tap to select the product image</Text>}
      </TouchableOpacity>
      
     
      <TouchableOpacity style={styles.button} onPress={()=>uploadProduct(productName, price, state.photo)}>
            {!state.submitting ?<Text style={{fontSize: wp("5%"), color: "white"}}>Upload Product</Text> : 
            <View style={{flexDirection: "row", justifyContent: "center"}}>
              <Text style={{fontSize: wp("5%"), color: "white"}}>Uploading    </Text>
            <ActivityIndicator color="whitesmoke" size="large"/>
            </View> }
        </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  )
};

UploadProduct.navigationOptions = {
  title: "Upload Product",
  drawerIcon: ({tintColor})=> <Entypo color={tintColor}  name="upload" size={20} />,
  
}

const styles = StyleSheet.create({
  text: {
    fontSize: wp("7%"),
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: hp("3%"),
    paddingBottom: hp("5%"),
    color: "green"
  },
  image: {
    width: wp("70%"),
    height: hp("50%")
  },
  container: {
    marginHorizontal: wp("15%"), 
    marginVertical: hp("1%"),
    width: wp("70%"),
    height: hp("50%"),
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

export default UploadProduct;
