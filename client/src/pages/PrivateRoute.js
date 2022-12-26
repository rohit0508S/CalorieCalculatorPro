import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const useAuth = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) return true;
    else return false;
  };
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
