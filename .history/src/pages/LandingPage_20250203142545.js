import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Shared/Footer";
import { motion } from "framer-motion";

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Navbar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: #fff;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const AuthLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  background-color: #3498db;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }
`;

const HeroSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(to right, #2c3e50, #34495e);
  color: #fff;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const GetStartedButton = styled(motion(Link))`
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: #fff;
  background-color: #e74c3c;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background-color: #c0392b;
    transform: scale(1.05);
  }
`;

const LandingPage = () => {
  return (
    <LandingPageContainer>
      <Navbar>
        <Logo>RecipeApp</Logo>
        <Nav>
          <AuthLink to="/login">Login</AuthLink>
          <AuthLink to="/register">Register</AuthLink>
        </Nav>
      </Navbar>

      <HeroSection>
        <HeroTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Discover & Share Recipes
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Explore a world of delicious recipes, share your own, and make cooking
          fun!
        </HeroSubtitle>
        <GetStartedButton
          to="/register"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </GetStartedButton>
      </HeroSection>

      <Footer />
    </LandingPageContainer>
  );
};

export default LandingPage;
