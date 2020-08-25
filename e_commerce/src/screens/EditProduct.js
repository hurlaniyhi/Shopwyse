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



const EditProduct = (props) => {


  const variab = props.navigation.getParam("data")

  const [productName, setProductName] = useState(variab.goodName)
  const [price, setPrice] = useState(variab.price)
  
  
  const {state, clearErrorMessage, editProduct, clearUploadProduct} = useContext(AuthContext)
 
 
 
 
 

  return (
    <SafeAreaView forceInset={{top: "always"}} style={{flex: 1}}>
      <ScrollView>
      <NavigationEvents onWillFocus={clearErrorMessage, clearUploadProduct}/>
      <Text style={styles.text}>Product Update</Text>
      <TextInput 
                
                style={styles.textInput} 
                autoCapitalize="none"
                autoCorrect={false} 
                value={productName}
                placeholder="Enter Product Name"
                onChangeText={(newValue)=> setProductName(newValue)}
            />
       <TextInput 
                keyboardType="numeric"
                style={styles.textInput} 
                autoCapitalize="none"
                autoCorrect={false} 
                value={price}
                placeholder="Enter Product Price"
                onChangeText={(newValue)=> setPrice(newValue)}
            />
    
     <View style={styles.container}>
       <Image style={styles.image} source={{uri: variab.image}} />
       
      </View>
     
     
      <TouchableOpacity style={styles.button} onPress={()=>editProduct(variab.id, variab.image, variab.likes, variab.likeColor, productName, price)}>
            {!state.submitting ?<Text style={{fontSize: wp("5%"), color: "white"}}>Update Product</Text> : 
            <View style={{flexDirection: "row", justifyContent: "center"}}>
              <Text style={{fontSize: wp("5%"), color: "white"}}>Updating    </Text>  
            <ActivityIndicator color="whitesmoke" size="large"/>
            </View> }
        </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  )
};

EditProduct.navigationOptions = {
  headerShown: null,
  title: "Update Product",
  
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

export default EditProduct;
