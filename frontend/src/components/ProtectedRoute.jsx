import { Navigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN); // Correct variable name
    return refreshTokenValue; // Return the refresh token value
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const Decoded = jwtDecode(token);
    const tokenExpiration = Decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      const refreshTokenValue = await refreshToken(); // Await refreshToken function
      try {
        const res = await api.post('/api/token/refresh/', { refresh: refreshTokenValue });
        if (res.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        setIsAuthorized(false);
        console.log(error);
      }
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  return isAuthorized ? children : <Navigate to='/login' />;
}

export default ProtectedRoute;
