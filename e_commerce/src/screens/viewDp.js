import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native";
import {SafeAreaView} from 'react-navigation'

import AuthContext from "../context/AuthContext"
import {FontAwesome, AntDesign, EvilIcons} from '@expo/vector-icons'
import Modal from 'react-native-modal'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer'

import {NavigationEvents} from 'react-navigation'
import { DrawerActions } from 'react-navigation-drawer';



const ViewDP = ({navigation}) => {
  
  
  const {state, selectDp, uploadDp, clearUploadProduct, StopModal, StartModal} = useContext(AuthContext)
  const [test, setTest] = useState(false)
 
  // function openDrawer(routeName, params) {
  //   navigation.dispatch(DrawerActions.openDrawer());
  // }
 
  return (
    <SafeAreaView forceInset={{top: "always"}} style={{flex: 1, backgroundColor: "black"}}>
      <NavigationEvents onWillFocus={clearUploadProduct}/>
      <View style={{height: hp("6%"), backgroundColor: "black", 
      flexDirection: "row", alignItems: "center", marginTop: hp("1%")}}>
      <TouchableOpacity onPress={()=>navigation.openDrawer()}>    
      <AntDesign name="back" size={30} color="white" style={{marginLeft: wp("4%")}}/>
      </TouchableOpacity>
      <Text style={{fontSize: wp("4.5%"), paddingLeft: wp("23%"), color: "white", fontWeight: "bold"}}>Profile photo</Text>
      <TouchableOpacity activeOpacity={.6} onPress={()=>selectDp()}>
      <EvilIcons name="pencil" size={40} style={{marginLeft: wp("23%"), color: "white"}}/>
      </TouchableOpacity>

      </View>
    
     <View style={styles.container}>
       {state.Dp ?<Image style={styles.image} source={{uri: state.Dp}} /> : 
       <Text style={{fontSize: wp("4%"), fontWeight: "bold", fontStyle: "italic", color: "#797979"}}>Tap to select profile picture</Text>}
      </View>
    
     
      
        <Modal 
        isVisible={state.isPics}
       // onBackdropPress={()=>StopModal()}
        swipeDirection="right"
        animationIn="slideInUp"
        animationOut="slideOutUp"
        // onSwipeComplete={()=>StopModal()}
        style={styles.modal}
    
        > 
          <View style={{height: hp("85%"), backgroundColor: "black", width: wp("90%"), 
          marginBottom: hp("3%"), overflow: "hidden"}}>
          
          {state.submitting ? 
          <>
          <Image style={{height: hp("85%"), opacity: .3}} source={{uri: state.uri}} />
          <ActivityIndicator color="whitesmoke" size="large" style={{position: "absolute", zIndex: 1, 
          top: hp("40%"), left: wp("42%"), transform: [{scale: 2}] }}/> 
          </>
          : <Image style={{height: hp("85%")}} source={{uri: state.uri}} />
          }
          </View>
          <View style={styles.modaltext} >
              <TouchableOpacity activeOpacity={.6} onPress={()=>StopModal()}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: wp("4.2%")}}>CANCEL</Text>
              </TouchableOpacity>
              <Text style={{paddingLeft: wp("45%")}}></Text>
              <TouchableOpacity activeOpacity={.6} onPress={()=>uploadDp(state.photo)} >
              <Text style={{color: "white", fontWeight: "bold", fontSize: wp("4.2%")}}>DONE</Text>
              </TouchableOpacity>
          </View>
        
        </Modal>

        <Modal 
        isVisible={state.dpMessage}
        onBackdropPress={()=>StopModal()}
        swipeDirection="right"
        animationIn="slideInUp" 
        animationOut="slideOutUp"
        onSwipeComplete={()=>StopModal()}
        style={styles.modal2}
    
        > 
        <View style={{bottom: hp("9%")}}>
       <AntDesign name="checkcircle" size={wp("17%")} color = "white" style={{color: "green"}} />
       <FontAwesome name="circle" size={wp("17%")} color="white" style={{position: "absolute", right: wp("1%"), zIndex: -1}}/>
        </View>
          <Text style={{fontSize: wp("7%"), bottom: hp("7%"), color: "green", fontWeight: "bold"}}>Awesome!</Text>
          <Text style={{fontSize: wp("4.5%"),color: "#BDBDBD", bottom: hp("3%"), paddingBottom: hp("6%"), textAlign: "center" }}>
            Profile picture successfully uploaded!
          </Text> 
          <TouchableOpacity activeOpacity={.8} style={styles.modaltext2} onPress={()=>StopModal()}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: wp("4.2%")}}>OK</Text>
          </TouchableOpacity>
        
        </Modal>

    </SafeAreaView>
  )
};

ViewDP.navigationOptions = {
 headerShown: null
  
}


const styles = StyleSheet.create({
  text: {
    fontSize: wp("7%"),
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: hp("4%"),
   
    color: "green"
  },
  image: {
    width: wp("100%"),
    height: hp("60%")
  },
  container: {
   // marginHorizontal: wp("5%"), 
    marginBottom: hp("1%"),
    marginTop: hp("12%"),
    width: wp("100%"),
    height: hp("60%"),
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
//   height: hp("6%"),
//   backgroundColor: "green",
//   width: wp("60%"),
//   justifyContent: "center",
//  alignItems: "center",
  flexDirection: "row",
 
  
}, 
modal: {
  // justifyContent: "center",
  alignItems: "center",
  // height: 50,
  marginHorizontal: wp("5%"),
  //marginTop: hp("26%"),
  //maxHeight: hp("40%"),
  backgroundColor: "black",
  borderRadius: 20,
  flex: 1
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

export default ViewDP;
