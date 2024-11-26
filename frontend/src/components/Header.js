import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled Components
const HeaderContainer = styled.header`
  display: none;
  justify-content: space-between;
  align-items: center;
  background-color: transparent; /* Set background color to transparent */
`;



const FloatingContainer2 = styled.div`
  position: fixed;
  top: 40px;
  left: 1450px;
  display: flex;
  z-index: 1000;
`;



const LoginButton = styled(Link)`
  background-color: white;
  color: #7aab35;
  border: none;
  padding: 15px 20px;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out, transform 0.2s;

  &:hover {
    background-color: #7aab35;
    color: white;
    transform: scale(1.05);
  }
`;

// Header Component
const Header = () => {
  return (
    <>
      <HeaderContainer />
      
      <FloatingContainer2>
        <LoginButton to="/login">Login / Signup</LoginButton>
      </FloatingContainer2>
    </>
  );
};

export default Header;
