import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Picker } from "react-native";
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



const EditProduct = (props) => {


  const variab = props.navigation.getParam("data")

  const [productName, setProductName] = useState(variab.goodName)
  const [price, setPrice] = useState(variab.price)
  const [category, setCategory] = useState(variab.category)
  const [color, setColor] = useState("black")
  
  
  const {state, clearErrorMessage, editProduct, clearUploadProduct, StopModal} = useContext(AuthContext)
 
 
 const done = async() => {
  await StopModal()
  props.navigation.navigate("home")
  
  
 }
 
 const selectChange = (item) => {
  setCategory(item)
  setColor("black")
  if(item == ""){
    setColor("#C3C3C3")
  }
}
 

  return (
    <SafeAreaView forceInset={{top: "always"}} style={{flex: 1}}>
      <ScrollView>
      <NavigationEvents onWillFocus={clearErrorMessage, clearUploadProduct}/>
      <View style={{height: hp("7%"), backgroundColor: "green", 
      flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: hp("3%")}}>
      <Text style={styles.text}>PRODUCT UPDATE</Text>
      </View>
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

        <View style={styles.textInput}>    
          <Picker 
            selectedValue={category}
            style={{color: color}}
            onValueChange={(itemValue) =>selectChange(itemValue)}
            placeholder={{label: "Great", value: "yea"}}
    
          >
         <Picker.Item label="Select category" value=""/>
         <Picker.Item label="Electronics" value="electronics"/>
         <Picker.Item label="Wears" value="wears" />
         <Picker.Item label="Others" value="others" />
         </Picker>
      </View>
    
     <View style={styles.container}>
       <Image style={styles.image} source={{uri: variab.image}} />
        
      </View>
     
     
      <TouchableOpacity activeOpacity={.8} style={styles.button} onPress={()=>editProduct(variab.id, variab.image, variab.likes, variab.likeColor, productName, price, category)}>
            {!state.submitting ?<Text style={{fontSize: wp("5%"), color: "white"}}>Update Product</Text> : 
            <View style={{flexDirection: "row", justifyContent: "center"}}>
              <Text style={{fontSize: wp("5%"), color: "white"}}>Updating    </Text>  
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
            Product has been updated!
          </Text> 
          <TouchableOpacity activeOpacity={.8} style={styles.modaltext} onPress={()=>done()}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: wp("4.2%")}}>OK</Text>
          </TouchableOpacity>
        
        </Modal>
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
    fontSize: wp("4.5%"),
    textAlign: "center",
    // fontWeight: "bold",
    // paddingTop: hp("1.5%"),
    // paddingBottom: hp("3%"),
    color: "white"
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
    // borderColor: "#C3C3C3",
    // borderWidth: 1,
    justifyContent: "center", 
    alignItems: "center",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    overflow: "hidden"
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
    //borderWidth: 1,
    height: hp("7%"),
    marginBottom: hp("2%"),
    paddingLeft: wp("4%"),
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    marginHorizontal: wp("10%"),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    //borderColor: "#C3C3C3",
    // textAlign: "center"
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

export default EditProduct;
