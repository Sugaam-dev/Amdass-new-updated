// src/Components/Done.jsx

import React from 'react';
import '../Styles/done.css'; // Separate CSS for Done page
import { Link } from 'react-router-dom';
import { IoMdDoneAll } from "react-icons/io";

function Done() {
  return (
    <div className="done-container">
      <div className="done-left">
        <div className="done-content">
          <div className="icon-text">
            <h1 style={{color:"#ea9e12"}}>
              <IoMdDoneAll style={{color:"blue", fontSize: "50px"}}/> 
              You Have Successfully Registered
            </h1>
          </div>
          <Link to='/' className="login-link">Click Here To Login</Link>
        </div>
      </div>
      <div className="done-right">
        <div className="rightLogo">
          <img src="./images/amd.png" alt="Amddas Foods Logo" />
        </div>
        <h2>Hello, Welcome to</h2>
        <h2><span>Amddas Foods</span></h2>
      </div>
    </div>
  );
}

export default Done;
