// src/Components/Otp.jsx

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../Styles/otp.css"; // Import the separate OTP CSS file
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import Footer from "./Footer";
import { port } from '../port/portno.js';
import AutoTyping from './AutoTyping'; // Include if you want AutoTyping on OTP page

function Otp() {
  const inputLength = 6;
  const inputRefs = useRef([]);

  const [inputs, setInputs] = useState(Array(inputLength).fill(''));
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendMessage, setResendMessage] = useState(""); // To display resend OTP success message
  const [isResending, setIsResending] = useState(false); // To handle resend button state
  const [timer, setTimer] = useState(20); // Countdown timer for resend OTP button
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // To control Continue button state

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;  // Get email from the previous page

  // Initialize refs only once
  useEffect(() => {
    inputRefs.current = Array(inputLength)
      .fill()
      .map((_, i) => inputRefs.current[i] || React.createRef());
  }, [inputLength]);

  // Focus on the first input after component mounts
  useLayoutEffect(() => {
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
    if (/^[0-9]$/.test(val) || val === "") { // Allow only single digit or empty
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
      const url = `${port}/verify-account?email=${email}&otp=${otpCode}`;
      const response = await axios.put(url);

      // Check if the response data contains an error message for invalid OTP
      if (response.data === "Invalid or expired OTP. Please regenerate OTP and try again.") {
        setError('Invalid or expired OTP. Please regenerate OTP and try again.');
        setSuccessMessage(""); // Clear success message if any
      } else {
        setSuccessMessage("OTP verified! You can now proceed.");
        setError(""); // Clear any previous error messages
        navigate('/done'); // Navigate to next page
      }
    } catch (error) {
      if (error.response?.status === 500) {
        setError('An internal server error occurred. Please contact support.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    setIsResending(true);
    setResendMessage("");
    setError(""); // Clear any existing errors before retrying

    try {
      const url = `${port}/regenerate-otp?email=${email}`;
      const response = await axios.put(url);

      // Check if the response indicates success
      if (response.data === "OTP has been resent successfully.") {
        setResendMessage("OTP has been resent successfully.");
        setTimer(20); // Reset the timer for the resend button
        setInputs(Array(inputLength).fill('')); // Clear inputs after resending
        if (inputRefs.current[0] && inputRefs.current[0].current) {
          inputRefs.current[0].current.focus();
        }
      } else {
        setError('');
      }
    } catch (error) {
      // Handle specific error cases
      if (error.response?.data) {
        setError(error.response.data);
      } else {
        setError('');
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

    return () => clearInterval(countdown); // Cleanup timer
  }, [timer]);

  return (
    <div className="otp-container">
      <div className="otp-left">
        <div className="introo">
          <p>
            <AutoTyping 
              texts={['A journey of flavors that speak to the soul and memories in every bite.']} 
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
          <p className="otp-subinfo"><strong>Please check your spam folder</strong></p>

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

            <button
              onClick={handleResendOtp}
              disabled={isResending || timer > 0}
              className="resend-btn"
            >
              {isResending ? "Resending OTP..." : timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Otp;
