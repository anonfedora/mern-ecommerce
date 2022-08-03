import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (!isAuthenticated){
    return <Navigate to="/login" replace/>
  }

  if (isAdmin === true && user.role !== "admin"){
    return <Navigate to="/"/>
  }

  return children;
};

export default ProtectedRoute;
