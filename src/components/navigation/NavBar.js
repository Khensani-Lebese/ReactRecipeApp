import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";

// Styled Components
const NavbarContainer = styled.nav`
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    color: #ffe6b3;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <NavbarContainer>
      <NavLinks>
        <StyledLink to="/home">
          <FaHome /> Home
        </StyledLink>
        <StyledLink to="/profile">
          <FaUser /> Profile
        </StyledLink>
      </NavLinks>
      <LogoutButton onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </LogoutButton>
    </NavbarContainer>
  );
};

export default Navbar;
