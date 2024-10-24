import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SignPage.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'; 

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('User registered successfully');
        navigate('/'); // Redirect to Home.js after signup
      } else {
        console.error(data.message); // Handle error response from backend
      }
    } catch (error) {
      console.error('Signup error:', error); // Handle network or other errors
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="signup-box">
          <h2>Sign up</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{10}"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="create-account-btn">Sign up</button>
          </form>

          <div className="divider">
            <span className="hr-line"></span>
            <p className="or-text">OR</p>
            <span className="hr-line"></span>
          </div>

          <div className="social-login">
            <button className="social-btn facebook-btn">
              <FontAwesomeIcon icon={faFacebookF} className="icon" />
            </button>
            <button className="social-btn google-btn">
              <FontAwesomeIcon icon={faGoogle} className="icon" />
            </button>
          </div>

          <p className="terms">
            <a href="Login">Already have an account? Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
