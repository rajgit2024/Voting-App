import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, role, requiredRole }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <Component />;
};

export default ProtectedRoute;
