// src/Components/Cnfpassword.jsx

import React, { useState } from 'react';
import '../Styles/cnf.css'; // Import the new CSS file
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import AutoTyping from './AutoTyping'; // Import AutoTyping if used
import TextField from '@mui/material/TextField';
import { port } from '../port/portno.js';

function Cnfpassword() {
  const [password, setPassword] = useState(''); // State for storing the new password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming the new password
  const [error, setError] = useState(''); // State for handling errors

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email passed from the previous page
  const otp = location.state?.otp; // Get OTP passed from the previous page

  const texts = [
    'Confirm your password to complete the reset process.',
  ];

  // Handle form submission to reset the password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Prepare the request data
      let data = JSON.stringify({
        email: email, // Pass email
        otp: otp, // Pass OTP received from the previous page
        newPassword: password, // Pass new password
      });

      // API request configuration
      let config = {
        method: 'post',
        maxBodyLength: Infinity, // Allow large request body
        url: `${port}/auth/reset-password`, // Correct API URL
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      // Make API request to reset password
      const response = await axios.request(config);

      if (response.status === 200) {
        // If successful, display popup and navigate to login page
        setError(''); // Clear any previous error messages

        // Show popup message
        window.alert('Your password has been changed successfully.');

        // Navigate to login page
        navigate('/');
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (error) {
      // Log error for debugging
      console.error('Error resetting password:', error);

      if (error.response?.status === 500) {
        setError('Invalid OTP.');
      } else {
        setError('An error occurred while resetting the password. Please try again.');
      }
    }
  };

  return (
    <div className="cnf-container">
      <div className="cnf-left">
        <div className="cnf-intro">
          <p style={{marginTop:"10px"}}>
            <AutoTyping texts={texts} speed={100} delay={1500}/>
          </p>
        </div>
      </div>
      <div className="cnf-right">
        <div className="cnf-rightLogo">
          <img src="./images/amd.png" alt="Amddas Foods Logo" />
        </div>
        <h2>Hello, Welcome to</h2>
        <h2>
          <span>Amddas Foods</span>
        </h2>

        {/* Form for resetting password */}
        <form onSubmit={handleResetPassword} className="cnf-form">
          {/* Input for new password */}
          <TextField
            id="outlined-password"
            label="New Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="cnf-textfield"
          />
          <br />

          {/* Input for confirming the new password */}
          <TextField
            id="outlined-confirm-password"
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="cnf-textfield"
          />
          <br />

          {/* Error message */}
          {error && <p className="cnf-error">{error}</p>}

          {/* Submit button */}
          <div className="cnf-but">
            <button type="submit" className="cnf-btn">
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cnfpassword;
