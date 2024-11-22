import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('authToken');
  
  // Check if the user is authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the requested component
  return <Component {...rest} />;
};

export default PrivateRoute;
