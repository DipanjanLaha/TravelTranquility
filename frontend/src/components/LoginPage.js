import React, { useState } from 'react';
import './LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faApple, faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
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
            <a href="/login">Forgot password?</a>
          </p>
          <p className="terms">
            <a href="SignUp">Don’t have an account yet? Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;