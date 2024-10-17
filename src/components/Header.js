import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



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
  font-size: 1.5rem;
  font-weight: bold;
  color: #7aab35;

  img {
    height: 40px; /* Adjust image size */
    margin-right: 10px; /* Space between image and text */
  }

  span {
    color: #2e582f; /* Text color for the brand */
    font-size: 1.8rem; /* Adjust text size if necessary */
  }
`;


const NavLinks = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 50px;
  
  li {
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    
    &:hover {
      color: #2e582f;
    }
  }
`;

const LoginButton = styled(Link)`
  background-color: #2e582f;
  color: white;
  border: none;
  padding: 15px 15px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

`;

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
      <LoginButton to="/login">Login/Signup</LoginButton>

    </HeaderContainer>
  );
}

export default Header;
