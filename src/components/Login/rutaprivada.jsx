import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/" />;
  }

  if (requiredRole && user.usuario.rol !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
