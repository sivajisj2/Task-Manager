import {Navigate} from "react-router-dom"
import {jwtDecode} from 'jwt-decode'
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState } from "react"

function protectedRoute({children}){
      const [isAuthorize, setIsAuthorized] = useState(null)

      const refreshToken = async()=> {

      }

      const auth = async () => {

      }

      if (isAuthorize === null){
        return <div>Loading...</div>
      }
      return isAuthorize ? children : <Navigate to='/login' />
}

export default protectedRoute