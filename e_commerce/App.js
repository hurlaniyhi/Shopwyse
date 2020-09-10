import React, {useContext, Component} from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation'
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer'
import {AuthProvider} from "./src/context/AuthContext"
import HomeScreen from "./src/screens/HomeScreen";
import SellerGoods from "./src/screens/sellerGoods";
import Logout from "./src/screens/Logout";
import UploadProduct from "./src/screens/UploadProduct";
import SignUp from "./src/screens/SignupScreen";
import SignIn from "./src/screens/SigninScreen";
import UserType from "./src/screens/UserType"
import { Text, StyleSheet, Image, View, ScrollView, Button, TouchableOpacity} from "react-native";
import {Icon, Text as Wrapper, Container} from 'native-base'

import {SafeAreaView} from 'react-navigation'
import ResolveAuth from './src/screens/resolveAuth'
import {FontAwesome5} from '@expo/vector-icons'
import {FontAwesome, AntDesign} from '@expo/vector-icons'
import Request from './src/screens/Request'
import AllRequests from "./src/screens/myRequests"
import ResquestToSeller from "./src/screens/RequestToSeller"
import RequestToSeller from './src/screens/RequestToSeller';
import EditProduct from "./src/screens/EditProduct"
import MyCarts from "./src/screens/MyCarts"
import BuyerChats from './src/screens/BuyerChatScreen';
import SellerChats from './src/screens/SellerChatScreen'
import AuthContext from "./src/context/AuthContext"
import ProfilePicture from "./src/screens/ProfilePicture"
import ForgetPassword from "./src/screens/ForgetPassword"
import ChangePassword from "./src/screens/ChangePassword"
import SellerHome from "./src/screens/SellerHome"
import {AsyncStorage} from 'react-native'
import App1 from "./src/screens/introSlider"
import ViewDP from "./src/screens/viewDp"

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'


// import AppIntroSlider from 'react-native-app-intro-slider'





const drawer = createStackNavigator({   // we did this instead of using what we commented out at the bottom so as to have access to the styling options
  home: HomeScreen,
  Request: Request,
  MyDp: ViewDP,
 
})

drawer.navigationOptions = {
  drawerIcon: ({tintColor})=><FontAwesome5 color={tintColor} name="home" size={20}/>,
  title: "Home"
  
}

const sellerdrawer = createStackNavigator({   // we did this instead of using what we commented out at the bottom so as to have access to the styling options
  home: SellerHome,
  MyDp: ViewDP,
 
})

sellerdrawer.navigationOptions = {
  drawerIcon: ({tintColor})=><FontAwesome5 color={tintColor} name="home" size={20}/>,
  title: "Home"
  
}

const drawer2 = createStackNavigator({   
  home: AllRequests,
  chat: BuyerChats
  
 
})

drawer2.navigationOptions = {
  drawerIcon: ({tintColor})=><FontAwesome color={tintColor} name="shopping-bag" size={20}/>,
  title: "My Requests"
  
}


const drawer3 = createStackNavigator({   
  home: RequestToSeller,
  sellerChat : SellerChats
 
})

drawer3.navigationOptions = {
  drawerIcon: ({tintColor})=><FontAwesome color={tintColor} name="shopping-basket" size={20}/>,
  title: "Buyers'  Requests"
  
}



const drawer4 = createStackNavigator({   
  home: SellerGoods,
  EditGood: EditProduct
 
})

drawer4.navigationOptions = {
  drawerIcon: ({tintColor})=><FontAwesome color={tintColor} name="shopping-bag" size={20}/>,
  title: "My Products"
  
}



const drawer5 = createStackNavigator({   
  cart: MyCarts,
  
 
})

drawer5.navigationOptions = {
  drawerIcon: ({tintColor})=><FontAwesome color={tintColor} name="shopping-cart" size={20}/>,
  title: "My Carts",
  
}




const switchNavigator = createSwitchNavigator({
  autoSignin: ResolveAuth,
  //UserType: UserType,
  slider: App1,
 


  loginFlow: createStackNavigator({
    Signup: SignUp,
    Signin: SignIn,
    ForgetPassword: ForgetPassword,
    ChangePassword: ChangePassword
  }),
  
  buyerFlow: createDrawerNavigator({
     Home: drawer,
     myRequests: drawer2,
     Carts: drawer5,
    // change_profile_picture: ProfilePicture,
     LogOutProfile: Logout
  },
  {
    contentComponent: (props) => {
  
      const {state, clearErrorMessage, fetchGoods, chooseDp} = useContext(AuthContext)
      console.log(state.Dp)
  
      return (
     <SafeAreaView forceInset={{top: "always"}} style={{flex: 1, backgroundColor:  "white"}}>
         <View style={{height: hp("38%"),alignItems: 'center', justifyContent: 'center', paddingTop: hp("4%"), backgroundColor: "rgba(47, 101, 66, .9)"}}>
           <Text style={{textAlign: "center", fontSize: wp("4.5%"), fontStyle: "italic", fontWeight: "bold", color: "white"}}>Buyer</Text>
           <View style={{flexDirection: "row", alignItems: "center"}}>
           <TouchableOpacity activeOpacity={.7} onPress={()=>props.navigation.navigate("MyDp")}><Image style={styles.image} source={{uri: state.Dp}} /></TouchableOpacity>
          <TouchableOpacity activeOpacity={.7} style={styles.alert} onPress={()=>chooseDp(props)}><FontAwesome  size = {20} name="camera" color="green"/></TouchableOpacity>
           </View>
         </View>
       <ScrollView>
         <DrawerItems activeTintColor="rgba(47, 101, 66, .9)" {...props} />
       </ScrollView>
     </SafeAreaView>
    )}
  }),

  sellerFlow: createDrawerNavigator({
    Home: sellerdrawer,
    requestToSeller: drawer3,
    SellerGoods: drawer4,
    Upload_Product: UploadProduct,
    //change_profile_picture: ProfilePicture,
    LogOut: Logout
 }, {
  contentComponent: (props) => {

    const {state, chooseDp} = useContext(AuthContext)


    //backgroundColor:  "rgba(0, 104, 58, .15)"
    //backgroundColor:  "rgba(47, 101, 66, .4)"
    return (
   <SafeAreaView forceInset={{top: "always"}} style={{flex: 1, backgroundColor:  "white"}}>
     
       <View style={{height: hp("38%"),alignItems: 'center', justifyContent: 'center',paddingTop: hp("4%"), backgroundColor: "rgba(47, 101, 66, .9)"}}>
       
       <Text style={{textAlign: "center", fontSize: wp("4.5%"), fontWeight: "bold", color: "white"}}>Seller</Text>
       <View style={{flexDirection: "row", alignItems: "center"}}>
           <TouchableOpacity activeOpacity={.7} onPress={()=>props.navigation.navigate("MyDp")}><Image style={styles.image} source={{uri: state.Dp}} /></TouchableOpacity>
          <TouchableOpacity activeOpacity={.7} style={styles.alert} onPress={()=>chooseDp(props)}><FontAwesome  size = {20} name="camera" color="green"/></TouchableOpacity>
        </View>
        
       </View>
     <ScrollView>
        <DrawerItems activeTintColor="rgba(47, 101, 66, .9)" labelStyle= {{
         //fontSize: 15,
         fontWeight: "bold",
      }} {...props} />
     </ScrollView>
   </SafeAreaView>
  )}
})


})
 

 

  // initialRouteName: "Home",
  // drawerPosition: "left",
  //  contentComponent: customDrawer,
  // drawerOpenRoute: "DrawerOpen",
  // drawerCloseRoute: "DrawerClose",
  // drawerToggleRoute: "DrawerToggle",
  // backBehavior: "history"


//   {... /drawer items}
//  ,
//   {
//     contentOptions: {
//       activeTintColor: colors.primary,
//       activeBackgroundColor: 'transparent',
//       inactiveTintColor: 'black',
//       inactiveBackgroundColor: 'transparent',
//       labelStyle: {
//         fontSize: 15,
//         marginLeft: 10,
//       },
//     },
//     drawerWidth: SCREEN_WIDTH * 0.7,
//     drawerOpenRoute: 'DrawerOpen',
//     drawerCloseRoute: 'DrawerClose',
//     drawerToggleRoute: 'DrawerToggle',
//   }
// );





const styles = StyleSheet.create({
 
  image: {
    height: hp("25%"),
    width: wp("50%"),
    marginLeft: wp("39%"),
    // marginLeft: wp("24%")
    // marginRight: wp("25%"),
    backgroundColor: "whitesmoke",
    borderRadius: 100, 
    marginTop: hp("3%"),
    marginBottom: hp("7%")
    
  },

  alert:{
    backgroundColor: "white",
    color: "white",
    marginLeft: wp("31%"),  
    width: wp("11%"),
    height: hp("5.5%"),  
    borderRadius: 100, 
    alignItems: "center",
    justifyContent: "center",
    right: wp("45%"),
    top: hp("7%")
    
    //
    //bottom: hp("6%")  
      
  },


})

const App = createAppContainer(switchNavigator);






export default () => {
  return(
        <AuthProvider>
          <App />                  
        </AuthProvider>
  )
}