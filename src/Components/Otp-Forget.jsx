// src/Components/Otpforget.jsx

import React, { useEffect, useRef, useState } from "react";
import "../Styles/otp.css"; // Import the same CSS file as Otp.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import AutoTyping from './AutoTyping'; // Ensure this component returns valid JSX
import Footer from './Footer'; // Ensure correct import
import { port } from '../port/portno.js';

function Otpforget() {
  const inputLength = 6;
  const inputRefs = useRef([]);

  const [inputs, setInputs] = useState(Array(inputLength).fill(''));
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(20);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // Initialize refs only once
  useEffect(() => {
    inputRefs.current = Array(inputLength)
      .fill()
      .map((_, i) => inputRefs.current[i] || React.createRef());
  }, [inputLength]);

  // Focus on the first input after component mounts
  useEffect(() => {
    if (inputRefs.current[0] && inputRefs.current[0].current) {
      inputRefs.current[0].current.focus();
    }
  }, []);

  // Enable Continue button only when all inputs are filled
  useEffect(() => {
    if (inputs.every(input => input !== "")) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [inputs]);

  // Handle OTP input changes
  const handleInputChange = (e, index) => {
    const val = e.target.value;
    if (/^[0-9]$/.test(val) || val === "") {
      const copyInputs = [...inputs];
      copyInputs[index] = val;
      setInputs(copyInputs);
      if (val !== "" && index < inputLength - 1) {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };

  // Handle backspace to move to previous input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (inputs[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1].current.focus();
        }
      } else {
        const copyInputs = [...inputs];
        copyInputs[index] = "";
        setInputs(copyInputs);
      }
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async () => {
    const otpCode = inputs.join("");

    if (otpCode.length !== inputLength) {
      setError("Please enter all 6 digits of the OTP.");
      return;
    }

    try {
      const url = `${port}/auth/verify-password-reset-otp?email=${encodeURIComponent(email)}&otp=${otpCode}`;
      const response = await axios.post(url, null, { // Assuming no body needed
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Include if required
        },
      });

      if (response.data === "Invalid or expired OTP.") {
        setError('Invalid or expired OTP. Please try again.');
        setSuccessMessage("");
      } else {
        setSuccessMessage("OTP verified! You can now proceed to reset your password.");
        setError("");
        navigate('/confirmpassword', { state: { email: email, otp: otpCode } });
      }
    } catch (error) {
      setError('An error occurred while verifying the OTP. Please try again later.');
      console.error('Error verifying OTP:', error);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    setIsResending(true);
    setResendMessage("");
    setError("");

    try {
      const url = `${port}/auth/regenerate-password-reset-otp`;
      const response = await axios.post(url, { email }, { // Sending email in body
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Include if required
        },
      });

      console.log('Resend OTP Response:', response.data); // Debugging

      if (response.data === "OTP has been resent successfully.") {
        setResendMessage("OTP has been resent successfully.");
        setTimer(20);
        setInputs(Array(inputLength).fill(''));
        if (inputRefs.current[0] && inputRefs.current[0].current) {
          inputRefs.current[0].current.focus();
        }
      } else {
        setError('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error resending OTP:', error); // Log the error
      if (error.response?.data) {
        setError(error.response.data);
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsResending(false);
    }
  };

  // Countdown timer for Resend OTP
  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }

    return () => clearInterval(countdown);
  }, [timer]);

  return (
    <div className="otp-container">
      <div className="otp-left">
        <div className="introo">
          <p>
            <AutoTyping 
              texts={['Enter your OTP to continue and verify your identity.']} 
              speed={100} 
              delay={1500}
            />
          </p>
        </div>
      </div>
      <div className="otp-right">
        <div className="rightLogo">
          <img src="./images/amd.png" alt="Amddas Foods Logo" />
        </div>

        <h2>Hello, Welcome to</h2>
        <h2><span>Amddas Foods</span></h2>

        <div className="otp-content">
          <p className="otp-info">
            Enter the OTP sent to: <strong>{email}</strong>
          </p>
          <p className="otp-subinfo"><strong>Please check your spam folder also</strong></p>

          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          {resendMessage && <p className="success-message">{resendMessage}</p>}

          <div className="otp-inputs">
            {inputs.map((value, index) => (
              <input
                key={index}
                ref={inputRefs.current[index]}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="otp-input"
                aria-label={`OTP Digit ${index + 1}`}
              />
            ))}
          </div>

          <div className="otp-buttons">
            <button
              onClick={handleOtpSubmit}
              disabled={isButtonDisabled}
              className="submit-btn"
            >
              Continue
            </button>
{/* 
            <button
              onClick={handleResendOtp}
              disabled={isResending || timer > 0}
              className="resend-btn"
            >
              {isResending ? "Resending OTP..." : timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button> */}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Otpforget;
