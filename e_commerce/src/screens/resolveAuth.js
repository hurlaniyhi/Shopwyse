import React, {useContext, useEffect} from 'react'
import AuthContext from "../context/AuthContext"

const ResolveAuth = (props) => {
    const {autoSignin} = useContext(AuthContext)
 
  useEffect(() => {
    autoSignin(props)
  }, [])
    return null
}
export default ResolveAuth
