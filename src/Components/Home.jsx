import React from 'react';

import { Routes,Route, useNavigate } from 'react-router-dom';
import Navbarr from './Navbar';

import '../Styles/ll.css'
import Menu from './Menu';
import PrivateRoute from './PrivateRoute';
function Home() {
 

 
 

  return (
    <div >
      <Navbarr/>
      {/* <h1>Welcome to the Home Page</h1>

      <div className="image-container">
      <img
        src="https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg"
        alt="coming soon"
        className="responsive-image"
      />
    </div> */}


{/* <Routes>
<Route
          path="/home/menu"
          element={
         <PrivateRoute>
          <Menu/>
         </PrivateRoute>
          }
        />
</Routes> */}

    </div>
  );
}

export default Home;
