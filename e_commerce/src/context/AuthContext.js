import React, {useReducer} from 'react'
import {AsyncStorage} from 'react-native'
import tradeApi from "../API/tradeApi"
//import {navigate} from "../navigationRef"  // to have access to navigate to any screen from this file's component
import { startAsync } from 'expo/build/AR'
import * as ImagePicker from 'expo-image-picker'



const AuthContext = React.createContext()

const authReducer = (state, action) => {
    
    switch (action.type){
      
        case "add_error":
          console.log(action.payload)
            return {...state, errorMessage: action.payload, submitting: "", carting: ""}
        case "signin":
            return {errorMessage: "", token: action.payload.token, username: action.payload.username, userType: action.payload.userType, Dp: action.payload.profilePicture} 
            // because we dont want error message to show up again after the user
            // has successfully logged in. so its better to set the properties 
            // inside the state to default(initial value) except the token
        case 'clear_errorMessage':
            return {...state, errorMessage: "",message: ""}

        case 'signout':
            return{token: null, errorMessage: ""}
        
        case 'change_image':
            return{...state, photo: action.payload, uri: action.payload.uri}

      
        case 'message':
            return{...state, errorMessage: "", message: action.payload, submitting: "", carting: ""}

        case 'clear_product':
            return{...state, errorMessage: "", message: "", photo: null, uri: null}

        case 'allgoods':
            return{...state, errorMessage: "", message: "", goods: action.payload}

        case 'stopLoad':
            return{...state, loadChat: ""}

        case 'my_requests':
            return{...state, errorMessage: "", message: "", myRequests: action.payload}

        case 'requests_to_seller':
            
            return{...state, errorMessage: "", message: "", requestsToSeller: action.payload.requests, pending: action.payload.pending, completed: action.payload.completed}

        case 'my_products':
            
            return{...state, errorMessage: "", message: "", myProducts: action.payload}

        case 'my_carts':
            
            return{...state, errorMessage: "", message: "", myCarts: action.payload}

        // case 'add_allchats':
        //     console.log(action.payload)
        //     return{...state, errorMessage: "", message: "", }

        case 'fetched_chats':
            
            return{...state, errorMessage: "", message: "", myChats: action.payload, loadChat: ""}


        case 'clear_myChats':
            
            return{...state, errorMessage: "", message: "", myChats: []}
    
        case 'sending':
            return{...state, submitting: action.payload}

        case 'save_chat_id':
            return{...state, chatId: action.payload.id, chatWith: action.payload.chatWith, chatOwner: action.payload.withChat}
        
        case 'Adding':
            return{...state, carting: action.payload}

        case 'fetching':
            return{...state, loadChat: "loading"}

        case 'stop_loading':
            return{...state, loadChat: ""}

        case 'period':
          return{...state, day: action.payload.period, date: action.payload.dayName} 

        
        case 'code':
          return{...state, code: action.payload.code, passwordMail: action.payload.mail} 
          
        case 'profile_pics':
          return{...state, Dp: action.payload} 

        case 'my_profile':
          console.log(action.payload)
          return{...state, username: action.payload.username, email: action.payload.email, phoneNumber: action.payload.phoneNumber,
             userType: action.payload.userType, receivedOrders: action.payload.receivedOrders, goodsUploaded: action.payload.goodsUploaded, 
             orderMade: action.payload.orderMade } 

        default: 
             return state
    }
}




export const AuthProvider = (props) => {  
    
    
    const [state, dispatch] = useReducer(authReducer, {token: null, username: null, userType: null, errorMessage: "", submitting: "", message:"", 
    photo: null, uri: null, goods:[], myRequests: [], requestsToSeller: [], myProducts: [], myCarts: [], myChats: {},  
    pending: 0, completed: 0, carting: "", chatId: "", chatWith: "", chatOwner: "", loadChat: "", day: "", date: "",
     Dp: "https://s3-ap-southeast-2.amazonaws.com/mandela-exhibition/wp-content/uploads/2018/08/location_white-01-01-1024x1024.png", 
     username: "", email: "", phoneNumber: "", receivedOrders: "", goodsUploaded: "", orderMade: "", code: "", passwordMail: ""})
    

    const signup = async(username, email, phoneNumber, password, props) => {
       
        dispatch({type: 'sending', payload: "loading"})
        const type = await AsyncStorage.getItem("userType")
         
        try{
            const response = await tradeApi.post('/signup', {username, email, password, userType: type, phoneNumber})
            console.log(response.data)
          if(response.data.token){
           
           await AsyncStorage.setItem('token', response.data.token)
           await AsyncStorage.setItem('username', response.data.username)
           await AsyncStorage.setItem('userType', response.data.userType)
           await AsyncStorage.setItem('Dp', response.data.profilePicture)


           dispatch({type: 'signin', payload: response.data})

           if(response.data.userType === "buyer"){
            props.navigation.navigate('buyerFlow')
          }else if(response.data.userType === "seller"){
            props.navigation.navigate('sellerFlow')
          }
            }

         else if(response.data){

            dispatch({type: 'add_error', payload: response.data})
        }
    }
        catch (err){
            dispatch({type: 'add_error', payload: "No network connection"})
        }
        
    }

    const signin = async(username, password, props) => {
           
        dispatch({type: 'sending', payload: "loading"})
        try{
           const response = await tradeApi.post('/signin', {username, password})
           console.log(response.data)
           if(response.data.token){
           await AsyncStorage.setItem('token', response.data.token)
           await AsyncStorage.setItem('username', response.data.username)
           await AsyncStorage.setItem('userType', response.data.userType)
           await AsyncStorage.setItem('Dp', response.data.profilePicture)

           dispatch({type: 'signin', payload: response.data})
          

           if(response.data.userType === "buyer"){
            props.navigation.navigate('buyerFlow')
          }else if(response.data.userType === "seller"){
            props.navigation.navigate('sellerFlow')
          }

        }
          
        else if(response.data){

            dispatch({type: 'add_error', payload: response.data})
        }
    }
        catch(err) {
            dispatch({type: 'add_error', payload: "No network connection"})
        }
    }

    const clearErrorMessage = () => {
        dispatch({type: 'clear_errorMessage'})
    }








    const autoSignin = async (props) => {
        const token = await AsyncStorage.getItem('token')
        const username = await AsyncStorage.getItem('username')
        const userType = await AsyncStorage.getItem('userType')
        const profilePicture = await AsyncStorage.getItem('Dp')
        if (token){

        dispatch({type: 'signin', payload: {token, username, userType, profilePicture}})

          if(userType === "buyer"){
            props.navigation.navigate('buyerFlow')
          }else if(userType === "seller"){
            props.navigation.navigate('sellerFlow')
          }


        }
        else{
            props.navigation.navigate('UserType')
        }
    }

    const signout = async (props) => {
         await AsyncStorage.removeItem('token')
         await AsyncStorage.removeItem('username')
         await AsyncStorage.removeItem('userType')
        
        dispatch({type: 'signout'})
        props.navigation.navigate("UserType")
        
    }

    const selectImage = async () => {
        let response = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3],
            base64: true
          });
          
          if (response.cancelled) {
            console.log('got here');
            return;
          }
      
            
        dispatch({type: 'change_image', payload: response})
    }


  //   const selectDp = async () => {
  //     let response = await ImagePicker.launchImageLibraryAsync({
  //         allowsEditing: false,
  //         aspect: [4, 3],
  //         base64: true
  //       });
        
  //       if (response.cancelled) {
  //         console.log('got here');
  //         return;
  //       }
    
          
  //     dispatch({type: 'change_Dp', payload: response})
  // }




    const uploadProduct = async (productName, price, photo) => {

        dispatch({type: 'sending', payload: "loading"})
    
        let cloudname = 'gtbank'
    
        let CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudname}/upload`
    
        let base64Img = `data:image/jpg;base64,${photo.base64}`; // where photo is the state holding the image properties
        
        let upload_preset_name = "xghctdft"
        let data = {
          "file": base64Img,
          "upload_preset": upload_preset_name,
        }
    
        fetch(CLOUDINARY_URL, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
        }).then(async r => {
          let data = await r.json()
          console.log("good")
         console.log(data.url)

         const response = await tradeApi.post('/uploadGoods', {imageUrl: data.url, goodName: productName, price: price})
         
         if(response.data === "Successful"){
            alert("Product succesfully uploaded")
          await dispatch({type: 'message', payload: "Product succesfully uploaded"})
            dispatch({type: 'clear_errorMessage', payload: data.url})
       
      }
        
      else if(response.data){
        alert("An error occur while uploading product")
          dispatch({type: 'add_error', payload: response.data})
      }
      else {
        alert("An error occur while uploading product")
          dispatch({type: 'add_error', payload: "No network connection"})
      }

         
        }).catch(err => { alert("No network connecton"); dispatch({type: 'add_error', payload: "No network connection"})})
    }




    const uploadDp = async (photo) => {

      dispatch({type: 'sending', payload: "loading"})
  
      let cloudname = 'gtbank'
  
      let CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudname}/upload`
  
      let base64Img = `data:image/jpg;base64,${photo.base64}`; // where photo is the state holding the image properties
      
      let upload_preset_name = "xghctdft"
      let data = {
        "file": base64Img,
        "upload_preset": upload_preset_name,
      }
  
      fetch(CLOUDINARY_URL, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then(async r => {
        let data = await r.json()
        console.log(data.url)
       
       
       
       const response = await tradeApi.post('/uploadDp', {imageUrl: data.url})
       
       if(response.data === "successful"){
         alert("Product succesfully uploaded")
          dispatch({type: 'message', payload: "Product succesfully uploaded"})
          await AsyncStorage.setItem('Dp', data.url)
          dispatch({type: 'profile_pics', payload: data.url})
          dispatch({type: 'clear_errorMessage', payload: data.url})
          
         
          
    }
      
    else if(response.data){
       alert("An error occur while uploading")
        dispatch({type: 'add_error', payload: response.data})
    }

       
      }).catch(err =>{ alert("No network connecton"); dispatch({type: 'add_error', payload: "No network connection"})})
  }






    const clearUploadProduct = async (props) => {
        
       dispatch({type: 'clear_product'})
       
   }




   const editProduct = async (id, image_url, goodName, price) => {
        
    dispatch({type: 'sending', payload: "loading"})
    
    try{
    const response = await tradeApi.post('/updateGoods', {id, image_url, goodName, price})
         
    if(response.data === "success"){
      alert("Product succesfully updated")
       dispatch({type: 'message', payload: "Product succesfully updated"})
       
       fetchMyGoods()
  
    }
   
     else if(response.data){
      alert("An error occur while updating")
     dispatch({type: 'add_error', payload: response.data})
    }
}
    catch(err) {
      alert("No network connection")
     dispatch({type: 'add_error', payload: "No network connection"})
   }

    

    
}




   const order = async (imageUrl, goodName, ownerName, price, ownerPhoneNumber) => {
    
    dispatch({type: 'sending', payload: "loading"})
    try{
    const response = await tradeApi.post('/request', {imageUrl, goodName, ownerName, price, ownerPhoneNumber})
         
         if(response.data.request){
           alert("You've Successfully ordered this product")
            dispatch({type: 'message', payload: "You've Successfully ordered this product"})
       
      }
        
      else if(response.data){
          alert("An erro occur while uploading")
          dispatch({type: 'add_error', payload: response.data})
      }
    }
      catch(err) {
        alert("No network connection")
          dispatch({type: 'add_error', payload: "No network connection"})
      }
    
}



const Add_cart = async (imageUrl, goodName, ownerName, price, phoneNumber) => {
    
    dispatch({type: 'Adding', payload: "loading"})
   try{
    const response = await tradeApi.post('/addCart', {imageUrl, goodName, ownerName, price, phoneNumber})
         
         if(response.data.cart){
           alert("You've Successfully Added this product to your cart")
            dispatch({type: 'message', payload: "You've Successfully Added this product to your cart"})
       
      }
        
      else if(response.data){
        alert("An erro occur while Adding to cart")
          dispatch({type: 'add_error', payload: response.data})
      }
    }
      catch(err) {
        alert("No network connection")
          dispatch({type: 'add_error', payload: "No network connection"})
      }
    
}




const forgetPassword = async (email, props) => {
    
  dispatch({type: 'Adding', payload: "loading"})

 try{
  const response = await tradeApi.post('/forgetPassword', {email: email})
  if (response.data.code){
   await dispatch({type: 'code', payload: {code: response.data.code, mail: email}})
    dispatch({type: 'add_error', payload: "No network connection"})
    props.navigation.navigate("ChangePassword")

  }
  else{
    dispatch({type: 'add_error', payload: "No network connection"})
    alert(response.data)
    
  }
       
  }
    catch(err) {
      dispatch({type: 'add_error', payload: "No network connection"})
      alert("No network connection")
       
    }
  
}


const changePassword = async (code, password, props) => {

  if(code != state.code){
    alert("Provide the code sent to your mail")
  }
    else{
  dispatch({type: 'Adding', payload: "loading"})

 try{
  const response = await tradeApi.post('/updatePassword', {password: password, email: state.passwordMail})
  if (response.data.message){
  
    dispatch({type: 'add_error', payload: "No network connection"})
    alert("password successfully changed")
    props.navigation.navigate("Signin")

  }
  else{
    dispatch({type: 'add_error', payload: "No network connection"})
    alert(response.data)
    
  }
       
  }
    catch(err) {
      dispatch({type: 'add_error', payload: "No network connection"})
      alert("No network connection")
       
    }
  }
  
}






 
   const fetchGoods = async () => {

    var today = new Date
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
  
        var period;

        if(today.getHours() >= 12 && today.getHours() < 16){
          period = "Afternoon"
        }
        else if (today.getHours() >= 16 && today.getHours() < 20){
          period = "Evening"
        }
        else if (today.getHours() >= 20 && today.getHours() != 0){
          period = "Night"
        }
        else{
          period = "Morning"
        }
        
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        var dayName = `${days[today.getDay()]} - ${today.getMonth()+1} - ${today.getFullYear()}`


        dispatch({type: 'period', payload: {period, dayName}})



    try{

    const response = await tradeApi.get('/allgoods')
         
         if(response.data){
             
            
            dispatch({type: 'allgoods', payload: response.data})
      }
    }
      catch(err){
        alert("No network connection")
        dispatch({type: 'add_error', payload: "No network connection"})
      }
        
    
}


const fetchMyRequests = async () => {
    try{
    const response = await tradeApi.get('/buyerRequests')
         
         if(response.data){
             
            
            dispatch({type: 'my_requests', payload: response.data})
      }
    }
      catch(err){
        alert("No network connection")
        dispatch({type: 'add_error', payload: "No network connection"})
      }
        
    
}



const fetchMyGoods = async () => {
    try{    
    const response = await tradeApi.get('/ownergoods')
         
         if(response.data){
             console.log(response.data)
            
            dispatch({type: 'my_products', payload: response.data})
      }
    }
      catch(err){
        alert("No network connection")
        dispatch({type: 'add_error', payload: "No network connection"})
      }
        
    
}


const fetchMyCarts = async () => {
     try{   
    const response = await tradeApi.get('/myCarts')
         
         if(response.data){
             console.log(response.data)
            
            dispatch({type: 'my_carts', payload: response.data})
      }
    }
      catch(err){
        alert("No network connection")
        dispatch({type: 'add_error', payload: "No network connection"})
      }
        
    
}



const deleteGoods = async (_id) => {
    try{    
    const response = await tradeApi.post('/deleteGoods', {id: _id})
         
         if(response.data){
            
            fetchMyGoods()
            
      }
    }
      catch (err){
        alert("No network connection")
        dispatch({type: 'add_error', payload: "No network connection"})
      }
    
    
}



const deleteCart = async (_id) => {
       try{ 
    const response = await tradeApi.post('/deleteCart', {id: _id})
         
         if(response.data == "successful"){
            
            fetchMyCarts()
            
      }
    }
      catch (err){
        alert("No network connection")
        dispatch({type: 'add_error', payload: "No network connection"})
      }
        
    
}


const deleteRequest = async (_id) => {
      try{  
    const response = await tradeApi.post('/deleteRequest', {id: _id})
         
         if(response.data){
            
            fetchMyRequests()
            
      }
    }
      catch(err){
        alert("No network connection")
        dispatch({type: 'add_error', payload: "No network connection"})
      }
        
    
}




const fetchRequestsToSeller = async () => {
   try{     
    const response = await tradeApi.get('/requestsToSeller')
         let pending = 0
         let completed = 0
         
         if(response.data){
           
            for(let check of response.data){
                if(check.status === "Pending" || check.status === "Accepted"){
                    pending = pending + 1
                }
                else if (check.status === "Completed"){
                    completed = completed + 1
                }
               
            }
            console.log(pending)
            console.log(completed)
            dispatch({type: 'requests_to_seller', payload: {requests: response.data, pending: pending, completed: completed}})
      }
    }
      catch (err) {
        alert("No network connection")
        dispatch({type: 'add_error', payload: "No network connection"})
      }
        
    
}


const updateRequest = async (_id, status) => {
   try{     
    const response = await tradeApi.post('/updateRequest', {id: _id, status: status})
         
         if(response.data){
            
            fetchRequestsToSeller()
            
      }
    }
      catch (err){
        alert("No network connection")
        dispatch({type: 'add_error', payload: "No network connection"})
      }
        
    
}


const userInfo = async () => {
  try{     
   const response = await tradeApi.get('/profile')
        
        if(response.data){
          // console.log(response.data)
          dispatch({type: 'my_profile', payload: response.data})
         
           
     }
   }
     catch (err){
       alert("No network connection")
       
     }
       
   
}


const fetchMyChats = async () => {
    // dispatch({type: 'fetching', payload: "loading"})
    try{ 
    const response = await tradeApi.post('/fetchChats', {chatId: state.chatId})
        
         if(response.data.chats){
            dispatch({type: 'fetched_chats', payload: response.data.chats})
            
      }else{
            dispatch({type: 'stop_loading', payload: "nothing"})
      }
     
    }
    catch(err){
      alert("No network connection")
        dispatch({type: 'add_error', payload: "No network connection"})
    }
    
}

const saveChats = async (chats) => {
  console.log(chats)
  await dispatch({type: 'fetched_chats', payload: chats})
}

const addId = async (id, chatWith, requestor, props) => {
        
   
     await dispatch({type: 'fetching', payload: "loading"})
      
        await dispatch({type: 'save_chat_id', payload: {id: id, chatWith: chatWith, withChat: requestor } })
        await dispatch({type: 'clear_myChats'})
       props.navigation.navigate('chat')
        
    
}

const stopLoading = async () => {
  
  await dispatch({type: 'stopLoad'})
}

const addId2 = async (id, chatWith, requestor, props) => {
        
   
  await dispatch({type: 'fetching', payload: "loading"})
    dispatch({type: 'save_chat_id', payload: {id: id, chatWith: chatWith, withChat: requestor } })
    await dispatch({type: 'clear_myChats'})
    props.navigation.navigate('sellerChat')
    

}




// const saveChats = async (chatId, text, side, ownerName, requestorName) => {
//    try{     
//     dispatch({type: 'Adding', payload: "loading"})
    

//     var today = new Date
//     var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()

// //   await dispatch({type: 'add_allchats', payload: {text: text, side: side, ownerName: ownerName, requestorName: requestorName, time: time}})
  
    

//     const response = await tradeApi.post('/saveChats', {chatId, chats: state.myChats, info: {text, side, ownerName, requestorName, time}})
         
//          if(response.data){
//             dispatch({type: 'message', payload: "Your message has been sent"})
            
//             fetchMyChats()
            
//       }
//     }
//       catch (err){
//         alert("No network connection")
//         dispatch({type: 'add_error', payload: "No network connection"})
//       }
        
    
// }

    

    const boundActions = {
        signup,
        signin,
        clearErrorMessage,
        autoSignin,
        signout,
        selectImage, 
        uploadProduct,
        clearUploadProduct,
        fetchGoods,
        order,
        fetchMyRequests,
        fetchRequestsToSeller,
        fetchMyGoods,
        deleteGoods, 
        updateRequest,
        deleteRequest,
        editProduct,
        Add_cart,
        deleteCart,
        fetchMyCarts, 
        fetchMyChats, 
        saveChats, 
        addId,
        addId2, 
        uploadDp,
        userInfo, 
        forgetPassword,
        changePassword,
        stopLoading
        
    }
    
    return (
    <AuthContext.Provider value={{state: state, ...boundActions}}>
        {props.children}
    </AuthContext.Provider>
    )
        
}
export default AuthContext














// import createDataContext from "./createDataContext"




// const authReducer = (state, action) => {
    
//     switch (action.type){
       
        
//            }
// }
    
    
  
// export const {Context, Provider} = createDataContext(
//     authReducer, {}, {isSignedIn: false}  
// )
