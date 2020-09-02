import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native";
import {SafeAreaView} from 'react-navigation'
import {Entypo} from '@expo/vector-icons'
import AuthContext from "../context/AuthContext"
import {FontAwesome, AntDesign} from '@expo/vector-icons'
import Modal from 'react-native-modal'
import { 
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

import {NavigationEvents} from 'react-navigation'



const UploadProduct = ({navigation}) => {

  const [productName, setProductName] = useState("")
  const [price, setPrice] = useState("")
  
  
  const {state, clearErrorMessage, selectImage, uploadProduct, clearUploadProduct, StopModal} = useContext(AuthContext)
 
 const done = async() =>{
  StopModal()
  setProductName("")
  setPrice("")
 }
 
 

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
                value={productName}
                onChangeText={(newValue)=> setProductName(newValue)}
            />
       <TextInput 
                keyboardType="numeric"
                style={styles.textInput} 
                autoCapitalize="none"
                autoCorrect={false} 
                placeholder="Enter Product Price"
                value={price}
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

        <Modal 
        isVisible={state.isCart}
        onBackdropPress={()=>done()}
        swipeDirection="right"
        animationIn="slideInUp" 
        animationOut="slideOutUp"
        onSwipeComplete={()=>done()}
        style={styles.modal}
    
        > 
        <View style={{bottom: hp("9%")}}>
       <AntDesign name="checkcircle" size={wp("17%")} color = "white" style={{color: "green"}} />
       <FontAwesome name="circle" size={wp("17%")} color="white" style={{position: "absolute", right: wp("1%"), zIndex: -1}}/>
        </View>
          <Text style={{fontSize: wp("7%"), bottom: hp("7%"), color: "green", fontWeight: "bold"}}>Awesome!</Text>
          <Text style={{fontSize: wp("4.5%"),color: "#BDBDBD", bottom: hp("3%"), paddingBottom: hp("6%"), textAlign: "center" }}>
            Product has been uploaded!
          </Text> 
          <TouchableOpacity style={styles.modaltext} onPress={()=>done()}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: wp("4.2%")}}>OK</Text>
          </TouchableOpacity>
        
        </Modal>
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

export default UploadProduct;
