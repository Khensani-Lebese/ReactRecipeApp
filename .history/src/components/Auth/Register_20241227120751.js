import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import './Auth.css';
const Registration = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Check if email already exists
      const { data: users } = await axios.get('http://localhost:5000/users');
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        alert('Email already in use');
        return;
      }
      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        name,
        surname,
        email,
        username,
        password: hashedPassword, // Store hashed password
      };
      await axios.post('http://localhost:5000/users', user);
      alert('User registered successfully');
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration');
    }
  };
  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};
export default Registration;