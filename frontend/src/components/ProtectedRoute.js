import React from 'react';
import { Navigate } from 'react-router-dom';

// This component takes the page you want to protect as 'children'
function ProtectedRoute({ children }) {
  // Check if the JWT token exists in localStorage
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect the user to the /login page
    return <Navigate to="/login" replace />; 
    // 'replace' prevents the user from going "back" to the protected page
  }

  // If the token exists, render the requested page (the children)
  return children; 
}

export default ProtectedRoute;