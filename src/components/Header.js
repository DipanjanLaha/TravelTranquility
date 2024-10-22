import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled Components
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: transparent; /* Set background color to transparent */
`;



const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: #7aab35;
  cursor: pointer;

  img {
    height: 40px;
    margin-right: 10px;
  }

  span {
    color: #2e582f;
    font-size: 2rem;
  }
`;

const NavLinks = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 40px;

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
  border-radius: 5px;
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
    <HeaderContainer>
      <Logo>
        <img src="/destination.png" alt="Travel Tranquility Logo" />
        <span>TRANQUILITY</span>
      </Logo>

      <NavLinks>
      <li><Link to="/">Home</Link></li>
        <li><Link to="/Destination">Destinations</Link></li>
        <li><Link to="/Feedback">Feedbacks</Link></li>
        <li><Link to="/Blog">Blog</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
      </NavLinks>

      <LoginButton to="/login">Login / Signup</LoginButton>
    </HeaderContainer>
  );
};

export default Header;
