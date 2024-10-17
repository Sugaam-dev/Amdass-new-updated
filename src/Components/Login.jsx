import React, { useState, useEffect } from 'react';
import '../Styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/authActions'; // Import login action from authActions
import { clearError } from '../Redux/authSlice'; // Import clearError from authSlice
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Footer from './Footer';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password)); // Dispatch login action
  };

  // Clear error on component mount
  useEffect(() => {
    dispatch(clearError()); // Dispatch clearError from authSlice
  }, [dispatch]);

  // If authenticated, navigate to home page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="mainlogin">
      <div className="login-container">
        <div className="login-left">
          <div className="loginnn">
            <div className="login-logo">
              <img style={{ width: "120px" }} src="./images/amd.png" alt="Logo" />
            </div>

            <h2>Hello, Welcome to</h2>
            <h1 style={{ marginBottom: "10px" }}>Amddas Foods</h1>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="inputBox">
                <input 
                  type="text" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <span>Email</span>
              </div>
              <div className="inputBox">
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <span>Password</span>
              </div>

              {/* Show error message if login fails */}
              {error && <p style={{ color: 'red' }}>{error}</p>}

              <div className="login-options">
                <div className="chk">
                  <input type="checkbox" id="remember" />    
                  <label htmlFor="remember" style={{ color: "#e2c9af" }}>Remember me</label>
                </div>
                <Link to='/forgot-password' style={{ fontSize: "16px", color: "#FFD8AF" }}>Forgot password?</Link>
              </div>

              <div className="login-buttons">
                <button style={{ width: "145px", marginRight: "5px" }} type="submit" className="login-btn" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <Link to='/signup'>
                  <button className="signup-btn">Sign up</button>
                </Link>
              </div>
            </form>

            <div className="login-footer" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
              <span style={{ marginRight: "20px", fontSize: "18px", fontFamily: "cursive" }}>Follow Us</span>
              <div className="social-icons">
                <Link><FaInstagram style={{color:'red'}}/></Link>
                <Link><FaFacebookF /></Link>
                <Link><FaYoutube style={{color:'red'}}/></Link>
                <Link><FaXTwitter style={{color:'white'}}/></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Login;
