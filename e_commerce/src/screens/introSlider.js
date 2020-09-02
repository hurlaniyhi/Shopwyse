import React, {useState, Component} from 'react'
import {StyleSheet, View, Text, Platform, Image, SafeAreaView, StatusBar, ImageBackground} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen'

  import {AntDesign, FontAwesome5} from '@expo/vector-icons'



  const styles = StyleSheet.create({
 
    image: {
      height: hp("25%"),
      width: wp("50%"),
      marginHorizontal: wp("25%"),
      backgroundColor: "whitesmoke",
      borderRadius: 100, 
      marginTop: hp("3%"),
      marginBottom: hp("7%")
      
    },
    overlay: {
      flex: 1,
      
      backgroundColor: "rgba(0, 104, 58, .4)", justifyContent: "center"
   },
   last: {
     fontSize: wp("12%"),
     fontWeight: "bold",
     color: "whitesmoke",
     fontStyle: "italic",
     textAlign: "center"
     
   },
   first: {
    // marginTop: hp("15%"),
    marginTop: hp("15%"),
   },
  
   chattitle: {
    fontSize: wp("8%"),
    fontWeight: "bold",
    color: "whitesmoke",
    fontStyle: "italic",
    textAlign: "center",
    paddingTop: hp("5%"),
    width: wp("70%")
   },
  
   chattext: {
    fontSize: wp("4%"),
    
    color: "whitesmoke",
    //textAlign: "center",
    paddingHorizontal: wp("10%"),
    paddingTop: hp("1%"),
    
    width: wp("85%")
   },
  
   shopImage: {
     backgroundColor: "whitesmoke"
   },
  
   hometext: {
    fontSize: wp("4%"),
    color: "whitesmoke",
    paddingHorizontal: wp("10%"),
    paddingTop: hp("1%"),
    textAlign: "center"
   },
   hometitle: {
    fontSize: wp("8%"),
    fontWeight: "bold",
    color: "whitesmoke",
    fontStyle: "italic",
    textAlign: "center",
    paddingTop: hp("5%"),
    paddingHorizontal: wp("5%")
   }
  
  })


const slides = [
    {
      key: 's1',
      title: 'Welcome to Shopwyse',
      text: 'A platform that enables you to buy and sell easily. Dive in now and get wowed!!!',
     
      // backgroundColor: "#33A635",
      backgroundColor: "#0D7C35",
      pic: require("../../buy1.png"),
      view: styles.first,
      titlestyle: styles.hometitle,
      textstyle: styles.hometext
     
    },
    {
      key: 's2',
      text: 'Buyers and sellers could easily converse from anywhere via the call and in-app chat features. You also get to see the status of what you ordered.',
      title: 'Call and Chat features',
      //image: require("./blue.jpg"),
      pic: require("../../call.jpg"),
      view: styles.first,
      backgroundColor: "#578C53",
      titlestyle: styles.chattitle,
      textstyle: styles.chattext
    },
    
    
    {
      key: 's3',
      
      title: "Let's Dive in...",
      image: require("../../startupImage.jpg"),
      backgroundColor: "rgba(0, 104, 58, .3)",
      titlestyle: styles.last,
      view: styles.overlay
    },
  ];



    
  
  export default class App1 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showRealApp: false,
        store: null
      };
    }
    
    _onDone = () => {
      this.setState({ showRealApp: true });
    };
    _onSkip = () => {
      this.setState({ showRealApp: true });
    };

  
    _renderItem = ({ item }) => {
        return (
            <View style={{flex: 1, backgroundColor: item.backgroundColor}}>
              <ImageBackground style={{flex: 1, height: hp("100%"), width: wp("100%")}} 
              source={item.image}>
              <View style={item.view}>
                {item.pic ? <Image source={item.pic} 
                style={{width: wp("70%"), height: hp("35%"), marginHorizontal: wp("15%"), borderRadius: wp("100%")}} />: null}
              <Text style={item.titlestyle}>{item.title}</Text>
              <Text style={item.textstyle}>{item.text}</Text>
              </View>
              </ImageBackground>
            </View>
        )
    };
  
    _renderNextButton = () => {
      return (
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <FontAwesome5
            name="arrow-circle-right"
            color="rgba(255, 255, 255, .9)"
            size={45}
          />
        </View>
      );
    };
  
    _renderDoneButton = () => {
      return (
        <View style={styles.buttonCircle}>
          <AntDesign
            name="checkcircle"
            color="rgba(255, 255, 255, .9)"
            size={45}
          />
        </View>
      );
    };
  
    render() {

      
       if (this.state.showRealApp) {
        return (
         this.props.navigation.navigate("Signin")
        );
      } else {
        return (
            <>
          {/* <StatusBar backgroundColor="white"/> */}
          {/* <SafeAreaView forceInset={{top: "always"}} backgroundColor="white" style={{flex: 1}}>   */}
          <AppIntroSlider
            data={slides}
            renderItem={this._renderItem}
            onDone={this._onDone}
            showSkipButton={true}
            onSkip={this._onSkip}
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
          />
         
          {/* </SafeAreaView> */}
          </>
          
        );
      }
    }
  }
  
  App1.navigationOptions ={
    headerShown: null 
  }

  
  