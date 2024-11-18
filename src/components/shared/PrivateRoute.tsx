import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Mock function to check if the user is authenticated
// Replace this with your actual authentication logic
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
