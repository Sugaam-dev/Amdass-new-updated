// src/Header.js
import React, { useState } from 'react';
import '../Styles/nav.css';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing React Icons

const Nav = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header>
      <nav>
        <div className="navbar">
          {/* Hamburger Menu Icon */}
          <div className="menu-icon" onClick={handleNavToggle} aria-label={navOpen ? 'Close Menu' : 'Open Menu'}>
            {navOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Logo */}
          <div className="logo">
            <a href="index.html">
              <img src="/images/amd.png" alt="CATCHUP Logo" />
            </a>
          </div>

          {/* Navigation Links */}
          <div className={`nav-links ${navOpen ? 'active' : ''}`}>
            {/* Sidebar Logo for Mobile */}
            <div className="sidebar-logo">
              <span className="logo-name">CATCHUP</span>
              <div className="close-icon" onClick={handleNavToggle} aria-label="Close Menu">
                <FaTimes />
              </div>
            </div>

            {/* Menus */}
            <ul className="menus">
              <li>
                <a className="waves" href="index.html">
                  {'Home'.split('').map((char, index) => (
                    <span key={index} style={{ '--spell': index + 1 }}>
                      {char}
                    </span>
                  ))}
                </a>
              </li>
              <li>
                <a className="waves" href="about.html">
                  {'About'.split('').map((char, index) => (
                    <span key={index} style={{ '--spell': index + 1 }}>
                      {char}
                    </span>
                  ))}
                </a>
              </li>
              <li>
                <a className="waves" href="gallery.html">
                  {'GALLERY'.split('').map((char, index) => (
                    <span key={index} style={{ '--spell': index + 1 }}>
                      {char}
                    </span>
                  ))}
                </a>
              </li>
              <li className={`dropdown ${dropdownOpen ? 'active' : ''}`}>
                <a
                  className="waves"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDropdownToggle();
                  }}
                >
                  {'MENU'.split('').map((char, index) => (
                    <span key={index} style={{ '--spell': index + 1 }}>
                      {char}
                    </span>
                  ))}
                </a>
                <ul className="dropdown-content">
                  <li>
                    <a href="menu2.html">Al a Carte Menu</a>
                  </li>
                  <li>
                    <a href="party.html">Party Packages</a>
                  </li>
                </ul>
              </li>
              <li>
                <a className="waves" href="events.html">
                  {'EVENTS'.split('').map((char, index) => (
                    <span key={index} style={{ '--spell': index + 1 }}>
                      {char}
                    </span>
                  ))}
                </a>
              </li>
              <li>
                <a className="waves" href="contact.html">
                  {'Contact-us'.split('').map((char, index) => (
                    <span key={index} style={{ '--spell': index + 1 }}>
                      {char}
                    </span>
                  ))}
                </a>
              </li>
              <li>
                <a className="book-now" href="contact.html">
                  Book Now
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
