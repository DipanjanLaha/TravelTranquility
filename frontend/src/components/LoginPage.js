import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faApple, faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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
        localStorage.setItem('token', data.token);
        navigate('/'); // Redirect to the Hero page (Home)
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="login-box">
          <h3>Log in to your travel planner</h3>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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
