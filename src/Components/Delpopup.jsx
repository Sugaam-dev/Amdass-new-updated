import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaDeleteLeft } from 'react-icons/fa6';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { port } from '../port/portno.js';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




// import DeleteIcon from '@mui/icons-material/Delete';

function Delpopup({tok}) {
  const [open, setOpen] = React.useState(false);
  const [openSnachbar, setOpenSnachbar] = React.useState(false);
  const [error, setError] = useState(''); // State for handling errors
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.tokenn; // Get OTP passed from the previous page
  const jwtToken = useSelector((state) => state.auth.token);
  const diffToast = () => {
    toast("cancle");
  }





  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSnachbar(false);
  };
  const handleYes = async (e) => {
    e.preventDefault();

    // Check if passwords match
    // if (password !== confirmPassword) {
    //   setError('Passwords do not match.');
    //   return;
    // }

    try {
      // Prepare the request data
      let data = JSON.stringify({
        token: tok.token, // Pass email
      });

      // API request configuration
      let config = {
        method: 'put',
        maxBodyLength: Infinity, // Allow large request body
        url: `${port}/api/order-details/cancel`, // Correct API URL
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        data: data,
      };

      // Make API request to reset password
      const response = await axios.request(config);

      if (response.status === 200) {
        // If successful, display popup and navigate to login page
        setError(''); // Clear any previous error messages

        // Show popup message
        // setOpenSnachbar(true);
        setOpen(false);

        // Navigate to login page
        // navigate('/');
        // setOpenSnachbar(true);
        diffToast();
      } else {
        setError('Failed to cancel order. Please try again.');
      }
    } catch (error) {
      // Log error for debugging
      console.error('Error resetting order:', error);

      if (error.response?.status === 500) {
        setError('Invalid OTP.');
      } else {
        setError('An error occurred while resetting the password. Please try again.');
      }
    }
  };
  return (
    <div>
      <div className='del-icon'>
      <Button variant="outlined" onClick={handleClickOpen}>
        <RiDeleteBin5Fill/>
      </Button>
      <ToastContainer />
      <Snackbar
        open={openSnachbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Your order has been cancelled successfully."
        // action={action}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do You Really Want to Cancel the Order?"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleYes}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  )}

export default Delpopup;