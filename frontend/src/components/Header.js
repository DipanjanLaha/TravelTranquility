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

const FloatingContainer1 = styled.div`
  position: fixed;
  top: 25px;
  height: 86px;
  left: 600px;
  display: flex;
  gap: 20px;
  z-index: 1000;
  background-color: white;
  border-radius: 50px;
`;

const FloatingContainer2 = styled.div`
  position: fixed;
  top: 40px;
  left: 1450px;
  display: flex;
  z-index: 1000;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 30px;
  padding: 15px;

  li {
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    a {
      text-decoration: none;
      color: #444;
      transition: color 0.3s ease-in-out;
    }

    a:hover {
      color: #7aab35;
    }

    &.active a {
      color: #7aab35;
    }
  }
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
      <FloatingContainer1>

        <NavLinks>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Destination">Destinations</Link></li>
          <li><Link to="/Feedback">Feedbacks</Link></li>
          <li><Link to="/Blog">Blog</Link></li>
          <li><Link to="/Contact">Contact</Link></li>
        </NavLinks>
      </FloatingContainer1>
      <FloatingContainer2>
        <LoginButton to="/login">Login / Signup</LoginButton>
      </FloatingContainer2>
    </>
  );
};

export default Header;
