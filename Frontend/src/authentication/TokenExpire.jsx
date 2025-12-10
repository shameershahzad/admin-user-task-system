import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const TokenExpire = ({ children }) => {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setExpired(true);
      return;
    }

    try {
      const { exp } = jwtDecode(token);
      const expiryTime = exp * 1000;
      const now = Date.now();

      if (now >= expiryTime) {
        // Token already expired
        setExpired(true);
        localStorage.removeItem("token");
        alert("Your session has expired. Please log in again.");
      } else {
        // Set a timer for when it will expire
        const timeout = expiryTime - now;
        const timer = setTimeout(() => {
          setExpired(true);
          localStorage.removeItem("token");
          alert("Your session has expired. Please log in again.");
        }, timeout);

        return () => clearTimeout(timer);
      }
    } catch (err) {
      setExpired(true);
      localStorage.removeItem("token");
      alert("Invalid session token. Please log in again.");
    }
  }, []);

  if (expired) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default TokenExpire;
