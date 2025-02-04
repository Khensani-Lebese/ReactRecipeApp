import React, { useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import styled from "styled-components";

const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #ff6b6b;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #e65c5c;
  }
`;

const TextLink = styled.p`
  margin-top: 10px;
  font-size: 14px;
  a {
    color: #ff6b6b;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Registration = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data: users } = await axios.get("http://localhost:5000/users");
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        alert("Email already in use");
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { name, surname, email, username, password: hashedPassword };
      await axios.post("http://localhost:5000/users", user);
      alert("User registered successfully");
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration");
    }
  };

  return (
    <RegistrationContainer>
      <h1>Register</h1>
      <Form onSubmit={handleRegister}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Register</Button>
      </Form>
      <TextLink>
        Already have an account? <a href="/login">Login here</a>
      </TextLink>
    </RegistrationContainer>
  );
};

export default Registration;
