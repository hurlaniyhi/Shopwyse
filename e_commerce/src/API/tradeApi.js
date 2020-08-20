import axios from 'axios'
import {AsyncStorage} from 'react-native'

// https://shopwyse-backend.herokuapp.com
// http://192.168.43.159:8080

const instance = axios.create({ // this is our config
    baseURL:  "https://shopwyse-backend.herokuapp.com"   
})


instance.interceptors.request.use(
    // this takes two function. the first one is the function we want to run before making request 
    // the second function is for handling error incase request fail

    async (config) => {
        const token = await AsyncStorage.getItem('token')
       
        
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },

    // anytime we make a request in any file, if we have a token, the header will be automatically
    // sent with the request to the backend

    (err) => {
        return Promise.reject(err)
    }
)


export default instance

















// // making request without header(Authorization )
// export default axios.create({
//     baseURL: "http://07f66d3d1ff9.ngrok.io"
// })