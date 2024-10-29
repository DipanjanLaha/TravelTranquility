import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/LoginPage';
import SignUp from '../pages/SignPage';

const Home = () => {
  return (
    <>
      <Login />
      <SignUp />
      

    </>
  );
}

export default Home;
