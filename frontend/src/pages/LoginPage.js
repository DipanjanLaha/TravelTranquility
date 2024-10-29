import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faApple, faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful', data.token);
        // Store the token in localStorage (optional)
        localStorage.setItem('token', data.token);
        // Redirect to the home page
        navigate('/');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">

        {/* Login Box */}
        <div className="login-box">
          <h3>Log in to your travel planner</h3>

          {/* Email Login */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-btn">Log in</button>
          </form>

          {/* OR Divider */}
          <div className="divider">
            <span className="hr-line"></span>
            <p className="or-text">OR</p>
            <span className="hr-line"></span>
          </div>

          {/* Social Login Buttons */}
          <div className="social-login">
            <button className="social-btn facebook-btn">
              <FontAwesomeIcon icon={faFacebookF} className="icon" />
            </button>
            <button className="social-btn google-btn">
              <FontAwesomeIcon icon={faGoogle} className="icon" />
            </button>
            <button className="social-btn apple-btn">
              <FontAwesomeIcon icon={faApple} className="icon" />
            </button>
          </div>

          <p className="terms">
            <a href="/forgot-password">Forgot password?</a>
          </p>
          <p className="terms">
            <a href="/signup">Don’t have an account yet? Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
