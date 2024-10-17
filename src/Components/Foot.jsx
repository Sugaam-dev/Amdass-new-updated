// Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/foot.css'; // Ensure the path is correct
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'; // Importing icons
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
export default function Footer() {
    const year=new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Logo Section */}
                    <div className="footer-logo">
                        <Link to="/" className="logo-link">
                            <img
                                src="./images/amd.png" // Update with the correct path
                                className="logo-image"
                                alt="Amddas Foods Logo"
                            />
                        </Link>
                        <p className="gstin">
                        Amddas Foods specializes in delivering fresh, delicious meals to companies, offering convenient, nutritious, and high-quality food options to keep employees satisfied and energized throughout the day.
                        </p>
                    </div>

                    {/* Connect with Us Section */}
                    <div className="footer-connect">
                        <h2>Connect with Us</h2>
                        <div className="social-icons">


                        <Link  className="social-icon"><FaInstagram style={{color:'red'}}/></Link>
                <Link  className="social-icon"><FaFacebookF style={{color:'blue'}}/></Link>
                <Link  className="social-icon"><FaYoutube style={{color:'red'}}/></Link>
                <Link  className="social-icon"><FaXTwitter style={{color:'#fff'}}/></Link>




                            
                        </div>
                        <div className="contact-infoo">
                          <Link>  {<MdEmail style={{fontSize:"30px",marginRight:"10px"}}/>}  info@amddas.net</Link>
                        </div>
                        <div className="location">
                           <Link to={'https://maps.app.goo.gl/fYZzn7KQt2BfN2us5'}>   <IoLocationSharp style={{fontSize:"30px",marginRight:"10px"}}/>AMDDAS FOODS PVT ltd SY NO : 67, SEEGEHALLI VILLAGE, BIDARAHALLI HOBLI BENGALURU EAST TALUK, BANGALORE-67 </Link>
                        </div>
                    </div>

                    {/* Important Links Section */}
                    <div className="footer-links">
                        <h2>Important Links</h2>
                        <ul>
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/privacy-policy">Terms & Conditions</Link></li>

                        </ul>
                    </div>
                </div>

                <hr className="footer-divider" />

                <div className="footer-bottom">
                <p>
          copyright © {year} Designed by{" "}
          <a href="https://sugaam.in " target="_blank" style={{color:"white",textDecoration:"none"}}>Sugaam.in</a> All Rights Reserved
        </p>
                </div>
            </div>
        </footer>
    );
}
