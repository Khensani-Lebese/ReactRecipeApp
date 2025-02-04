// src/components/Shared/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Shared.css'; // Import the CSS file for styling

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-link" to="/home">Home</Link>
        <Link className="navbar-link" to="/profile">Profile</Link>
        <button className="navbar-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
