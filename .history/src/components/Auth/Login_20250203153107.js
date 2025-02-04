import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { api } from "../../services/api";
import styled from "styled-components";

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.2);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 15px;
  background: #ff7e5f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: #feb47b;
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const users = (await api.get("/users")).data;
      const user = users.find(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (user && bcrypt.compareSync(password, user.password)) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <AuthContainer>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </Form>
      <TextLink
        Don't have an account? <a href="/register">Register here</a>
      </TextLink>
    </AuthContainer>
  );
};

export default Login;
