import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
