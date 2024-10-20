//ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // console.log("document.cookie :  ",document.cookie)
    // const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    // if (!token) {
    //     console.log("protected route first check");
    //   navigate("/login");
    //   return;
    // }

    Axios.get("https://ground-backend.onrender.com/auth/verify",  { withCredentials: true })
      .then((res) => {
        console.log("Verification response:", res.data);
        if (res.data.status) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Verification error:", err);
        setIsAuthenticated(false);
        navigate("/login");
      });
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
