import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/authActions';
import { clearError } from '../Redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/log.css';
import AutoTyping from './AutoTyping';
import TextField from '@mui/material/TextField';
const Log = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  const texts = [
    'A journey of flavors that speak to the soul and memories in every bite.'
   
  ];


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  const sign =()=>{
    navigate('/signup')
  }
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-container">
      <div className="login-left">
        {/* <img src="./images/amd.png" alt="Office" className="office-image" /> */}
        <div className="intro">
          <div className="au">
      <p>{<AutoTyping  texts={texts} speed={100} delay={1500}/>}</p>
      </div>
    </div>
        {/* <div className="contact-overlay">
         
          <div className="contact-info">
          <h1>Contact us</h1>
            <div className="contact-item">
              <i className="phone-icon"></i>
              <span>470-601-1911</span>
            </div>
            <div className="contact-item">
              <i className="email-icon"></i>
              <span>https://veilmail.io/irish-geoff</span>
            </div>
            <div className="contact-item">
              <i className="location-icon"></i>
              <span>654 Sycamore Avenue, Meadowville, WA 76543</span>
            </div>
          </div>
        </div> */}
      </div>
      <div className="login-right">
    {/* <div className="intro">
      <p>{<AutoTyping  texts={texts} speed={100} delay={1500}/>}</p>
    </div> */}
    <div className="rightLogo">
    <img src="./images/amd.png" alt="" />
    </div>
    
    <h2>Hello, Welcome to</h2>
    <h2><span>Amddas Foods</span></h2>
        <form onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Email" variant="outlined"    type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>
         <br />
                <TextField id="outlined-basic" label="Password" variant="outlined"       type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/>  
            <br />
          <div className="remember-me">
            <label>

                  <input type="checkbox" id="remember" />    
                 
    
              Remember Me
            </label>
            <div className="forgot-password">
          <Link to='/forgot-password' style={{ fontSize: "16px", color: "#000" }}>
            Forgot Password?
          </Link>
        </div>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
         <div className="but">
         <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        
                  <button onClick={sign} className="signup-btn">Sign up</button>
              
         </div>
        </form>
      
      </div>
    </div>
  );
};

export default Log;