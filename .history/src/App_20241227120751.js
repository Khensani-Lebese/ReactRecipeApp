// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Register';
import ProtectedRoute from './components/Shared/ProtectedRouter';
import RecipeDetail from './pages/RecipeDetails';

// A simple utility to check if user is authenticated
const useAuth = () => {
  // Replace with your authentication logic
  return !!localStorage.getItem('authToken');
};

const App = () => {
  const isAuthenticated = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Registration />} />
        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path="/recipe/:id" element={<ProtectedRoute element={<RecipeDetail />} />} />
      </Routes>
    </Router>
  );
};

export default App;
