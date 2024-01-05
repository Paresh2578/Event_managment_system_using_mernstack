import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    let a = JSON.parse(localStorage.getItem("adminAuth"));
    console.log(a);
  useEffect(() => {
    
   
  }, []);

  if (a == null) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;
