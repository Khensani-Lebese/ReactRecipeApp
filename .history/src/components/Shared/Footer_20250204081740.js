// src/components/Shared/Footer.js
import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 15px 0;
  font-size: 16px;
  position: fixed;
  bottom: 0;
  width: 100%;

  p {
    margin: 0;
    font-weight: bold;
    transition: color 0.3s ease-in-out;
  }

  &:hover {
    p {
      color: #ffcc00; /* Highlight color on hover */
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© {new Date().getFullYear()} Recipe App</p>
    </FooterContainer>
  );
};

export default Footer;
