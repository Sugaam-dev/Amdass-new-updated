// Navbarr.jsx
import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Navbar.css'; // Import your custom CSS
import { FaHome } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Redux/authActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { port } from '../port/portno';
import { CiMenuBurger } from "react-icons/ci";

function Navbarr() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwtToken = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);

  const [expanded, setExpanded] = useState(false); // State to manage Offcanvas visibility

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => setExpanded(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${port}/delete-account?email=${email}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      alert('Delete request sent');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to send delete request.');
    }
  };

  return (
    <Navbar
      expand="lg" // Navbar expands on large screens and above
      className="mb-3"
      style={{ background: 'transparent' }}
      expanded={expanded}
    >
      <Container fluid style={{ paddingLeft: '40px', paddingRight: '40px' }}>
        {/* Navbar Brand */}
        <Navbar.Brand href="#">
          <img src="./images/amd.png" alt="logo" style={{ width: '150px' }} />
        </Navbar.Brand>

        {/* CiMenuBurger Icon - Visible only on small and medium screens */}
        <CiMenuBurger onClick={handleToggle} className="d-lg-none" style={{ cursor: 'pointer',color:"#ffffff",fontSize:"40px" }} />

        {/* Navbar.Collapse - Visible only on large screens and above */}
        <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
          <Nav className="ms-auto">
            {/* Profile Dropdown */}
            <NavDropdown
              title={
                <span className="email-link">
                  <CgProfile style={{ marginRight: "10px" }} />
                  {email}
                </span>
              }
              id="basic-nav-dropdown"
              style={{ marginRight: '10px' }}
            >
              <NavDropdown.Item onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
              <NavDropdown.Item style={{ color: 'red' }} onClick={handleDelete}>
                Delete Account
              </NavDropdown.Item>
            </NavDropdown>

            {/* Home Link */}
            <Nav.Link href="/home" className="home-link">
              <FaHome style={{ marginRight: '0.5rem' }} />
              Home
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Offcanvas for Small and Medium Screens */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={expanded}
          onHide={handleClose}
          className="d-lg-none" // Only show Offcanvas on small and medium screens
          style={{ backgroundColor: '#f8f9fa' }} // Example inline style
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Amddas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{ paddingRight: '50px' }}>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {/* Profile Dropdown */}
              <NavDropdown
                title={
                  <span className="email-link">
                    <CgProfile style={{ marginRight: "10px" }} />
                    {email}
                  </span>
                }
                id="offcanvasNavbarDropdown"
                style={{ marginRight: '10px' }}
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Item style={{ color: 'red' }} onClick={handleDelete}>
                  Delete Account
                </NavDropdown.Item>
              </NavDropdown>

              {/* Home Link */}
              <Nav.Link href="/home" className="home-link">
                <FaHome style={{ marginRight: '0.5rem' }} />
                Home
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Navbarr;
