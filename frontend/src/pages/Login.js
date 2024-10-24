import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/LoginPage';
import SignUp from '../components/SignPage';

const Home = () => {
  return (
    <>
      <Login />
      <SignUp />
      

    </>
  );
}

export default Home;
