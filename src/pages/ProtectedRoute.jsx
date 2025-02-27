import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Check if the token exists

  // If the token is not present, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the token is present, allow access to the protected route
  return <Outlet />;
};

export default ProtectedRoute;