import React, { useState } from 'react';
import './SignPage.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'; 

const SignUp = () => {
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

        {/* Signup Box */}
        <div className="signup-box">
          <h2>Sign up</h2>

          {/* Email Sign Up */}
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