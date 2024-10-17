import './App.css';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Otp from './Components/Otp';
import Forget from './Components/Forget';
import Done from './Components/Done';
import Otpforget from './Components/Otp-Forget';
import Cnfpassword from './Components/Cnfpassword';
import Home from './Components/Home';
import PrivateRoute from './Components/PrivateRoute';
import Menu from './Components/Menu';
import Navbarr from './Components/Navbar';
import Error from './Components/Error';
import Demo from './Components/Demo';
import Log from './Components/Log';
import Foot from './Components/Foot'
import PrivacyPolicy from './Components/PrivacyPolicy';
import Nav from './Components/Nav';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Log />} />
        <Route path='/*' element={<Error/>}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/getotp' element={<Otp />} />
        <Route path='/forgot-password' element={<Forget />} />
        <Route path='/done' element={<Done />} />
        <Route path='/verify-otp' element={<Otpforget />} />
        <Route path='/confirmpassword' element={<Cnfpassword />} />
     <Route path='privacy-policy' element={<PrivacyPolicy/>}/>
  
<Route path='/log' element={<Log/>}/>
        {/* Protect home route */}
<Route path='/nav' element={<Nav/>}/>
      
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
              <Menu/>
            </PrivateRoute>
          }
        />

<Route
          path="/menu"
          element={
            <PrivateRoute>
             <Navbarr/>
              <Demo/>
            </PrivateRoute>
          }
        />
          



      </Routes>
      <Foot/>
    </BrowserRouter>
  );
}

export default App;
