import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const path = location.pathname;
  // Note: Used replace in <Navigate /> to avoid pushing redirects into history stack.
  // Redirect unauthenticated users trying to access any page except login/register
  if (
    !isAuthenticated &&
    !path.includes("/login") &&
    !path.includes("/register")
  ) {
    return <Navigate to="/auth/login" replace />;
  }
  // Redirect authenticated users away from login/register
  if (
    isAuthenticated && (path.includes("/login") ||
    path.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/shop/home" replace />;
    }
  }
  // Prevent non-admin users from accessing admin routes
  if (isAuthenticated && user?.role !== "admin" && path.includes("/admin")) {
    return <Navigate to="/unauth-page" replace />;
  }
  // Prevent admin users from accessing shop routes
  if (isAuthenticated && user?.role === "admin" && path.includes("/shop")) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <>{children}</>;
};

export default CheckAuth;
