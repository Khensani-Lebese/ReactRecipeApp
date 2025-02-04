import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './Navigation';
import Footer from './Footer';

const ProtectedRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user.role);
  const token = localStorage.getItem('token');
  console.log('JWT Token:', token); 
  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="protected-route-container">
      <Navbar />
      <div className="protected-route-content">
        {element}
      </div>
      <Footer />
    </div>
  );
};

export default ProtectedRoute;
