import React, { useState, useEffect } from 'react';
import '../Styles/signup.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import Footer from './Footer';
import axios from 'axios';
import { port } from '../port/portno.js';
import AutoTyping from './AutoTyping'; // If you want to include AutoTyping on signup
import TextField from '@mui/material/TextField';

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confpassword) {
      setError("Passwords do not match!");
      return;
    }

    const user = {
      email: email,
      name: name,
      password: password
    };

    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(`${port}/register`, user);
      setSuccessMessage("User registered successfully!");
      setError("");  
      navigate('/getotp', { state: { email: email } });
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Failed to register. Please try again.');
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const sign = () => {
    navigate('/signup');
  }

  // Clear error on component mount
  useEffect(() => {
    // Assuming you have a similar clearError action
    // dispatch(clearError());
  }, []);

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="intro">
          <div className="au">
          <p>
            <AutoTyping 
              texts={['A journey of flavors that speak to the soul and memories in every bite.']} 
              speed={100} 
              delay={1500}
            />
          </p>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="rightLogo">
          <img src="./images/amd.png" alt="Amddas Foods Logo" />
        </div>
        
        <h2>Hello, Welcome to</h2>
        <h2><span>Amddas Foods</span></h2>
        
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          
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
          <TextField 
            id="outlined-basic" 
            label="Name" 
            variant="outlined" 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField 
            id="outlined-basic" 
            label="Password" 
            variant="outlined" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField 
            id="outlined-basic" 
            label="Confirm Password" 
            variant="outlined" 
            type="password"
            value={confpassword}
            onChange={(e) => setConfPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          
          <div className="but">
            <button 
              type="submit" 
              className="signup-btn"
              disabled={isLoading} // Disable button during loading
            >
              {isLoading ? 'Signing up...' : 'Signup'}
            </button>
            <Link to='/'>
              <button type="button" className="login-btn">Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
