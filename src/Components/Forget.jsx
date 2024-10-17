// src/components/Forget.jsx

import React, { useState } from 'react';
import '../Styles/forget.css'; // Import the updated CSS file
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import AutoTyping from './AutoTyping'; // Import the updated AutoTyping component
import { port } from '../port/portno.js';

function Forget() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Texts for the AutoTyping component
  const texts = [
    'Reset your password and get back on track securely.'
  ];

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address.');
      setSuccessMessage('');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${port}/auth/forgot-password`, { email });

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('OTP has been sent to your email.');
        setError('');
        navigate('/verify-otp', { state: { email } });
      } else {
        setError('Failed to send OTP. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error in sending OTP:', error);
      if (error.response) {
        setError(error.response.data.message || 'An error occurred. Please try again later.');
      } else {
        setError('An error occurred. Please check your connection or try again later.');
      }
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forget-container">
      <div className="forget-left">
        <div className="introf">
          <div className="au">
           <p> <AutoTyping texts={texts} speed={100} delay={1500} /></p>
          </div>
        </div>
      </div>
      <div className="forget-right">
        <div className="rightLogo">
          <img src="./images/amd.png" alt="Amddas Foods Logo" />
        </div>
        <h2>Hello, Welcome to</h2>
        <h2>
          <span>Amddas Foods</span>
        </h2>
        <form onSubmit={handleForgotPassword}>
          <h2 className="form-title">Reset Your Password</h2>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div className="but">
            {/* Removed the <Link> wrapper from the submit button */}
            <button type="submit" className="forget-btn" disabled={isLoading}>
              {isLoading ? 'Sending OTP...' : 'Get OTP'}
            </button>
            {/* Retained the <Link> for the Login button */}
            <Link to="/">
              <button type="button" className="signup-btn">
                Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forget;
