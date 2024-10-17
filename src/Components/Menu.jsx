// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import '../Styles/menu.css'; // Import the CSS file for styling
// import { port } from '../port/portno';
// import { FaTruckField } from 'react-icons/fa6';
// import { jwtDecode } from 'jwt-decode'

// function Menu() {
//   // State Variables
//   const [menuData, setMenuData] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [activeFilter, setActiveFilter] = useState('Veg');
//   const [error, setError] = useState(null);
//   const [bookingDay, setBookingDay] = useState('');
//   const [otp, setOtp] = useState(null);
//   const [isSunday, setIsSunday] = useState(false);
//   const [isTuesday, setIsTuesday] = useState(false);
//   const [selectedMenuId, setSelectedMenuId] = useState(null);
//   const [orderResponse, setOrderResponse] = useState('');
//   const [otpTokenId, setOtpTokenId] = useState('');
//   const [formattedDate, setFormattedDate] = useState('');
//   const [tokenUses, setTokenUses] = useState(null);
//   const [orderId, setOrderId] = useState(null);
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [tokenn, setTokenn] = useState(null);
//   const [datee, setDate] = useState(null);
//   const [isOrderDetailsLoading, setIsOrderDetailsLoading] = useState(false);
// const[quantity,setQuntity]=useState(null)
//   // Redux Selectors
//   const jwtToken = useSelector((state) => state.auth.token);
//   const email = useSelector((state) => state.auth.email); // Get the logged-in user's email
//   const dispatch = useDispatch();

// console.log(selectedMenuId)

// // console.log(orderDetails)









//   // Decode JWT to get userId
//   let decode;
//   let userId;

//   if (jwtToken) {
//     try {
//       decode=jwtDecode(jwtToken)
//       userId = decode.userId; // Ensure 'userId' exists in the token
//     } catch (error) {
//       console.error('Error decoding JWT:', error);
//       setError('Invalid authentication token.');
//     }
//   } else {
//     console.warn('JWT token is missing.');
//     setError('Authentication token is missing.');
//   }

//   // Helper Functions
//   const getDayName = (dayIndex) => {
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     return days[dayIndex];
//   };

//   const getBookingDay = (dayIndex) => {
//     if (dayIndex === 6 || dayIndex === 5) {
//       return 'Monday';
//     } else if (dayIndex === 4) {
//       return 'Friday';
//     } else if (dayIndex === 3) {
//       return 'Thursday';
//     } else if (dayIndex === 2) {
//       return 'Wednesday';
//     } else if (dayIndex === 1) {
//       return 'Tuesday';
//     } else if (dayIndex === 0) {
//       return 'Monday';
//     }
//   };

//   // Updated Helper function to format date with special logic
//   const formatDate = (isoString) => {
//     if (!isoString) return 'Invalid Date';

//     const date = new Date(isoString);
//     if (isNaN(date)) return 'Invalid Date';

//     const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

//     if (day === 5) { // Friday
//       date.setDate(date.getDate() + 3); // Next Monday
//     } else if (day === 6) { // Saturday
//       date.setDate(date.getDate() + 2); // Next Monday
//     } else {
//       date.setDate(date.getDate() + 1); // Next day
//     }

//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return date.toLocaleDateString('en-US', options);
//   };

//   // Fetch the latest order ID
//   const fetchLatestOrderId = async () => {
//     try {
//       const response = await axios.get(`${port}/api/orders/latest/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });
//       const fetchedOrderId = response.data?.orderId;
//       if (fetchedOrderId) {
//         setOrderId(fetchedOrderId); // Update orderId after fetching
//         setError(null); // Clear any previous errors
//         return fetchedOrderId;
//       } else {
//         console.warn('No order ID found in the response.');
//         setError('No order ID found.');
//         return null;
//       }
//     } catch (error) {
//       console.error('Error fetching order data:', error);
//       if (error.response && error.response.status === 403) {
//         setError('You need to login again.');
//       } else {
//         setError('Failed to fetch order data. Please try again.');
//       }
//       return null;
//     }
//   };

//   // Fetch order details based on orderId
//   const fetchOrderDetails = async (fetchedOrderId) => {
//     try {
//       setIsOrderDetailsLoading(true); // Start loading
//       const response = await axios.get(`${port}/api/order-details/${fetchedOrderId}`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });
//       setOrderDetails(response.data); // Store order details from the API
//       setTokenn(response.data.token || null); // Update tokenn based on fetched order details
//       setDate(response.data.dateTimeToken);
//       setQuntity(response.data.quantity)
//       setError(null); // Clear any previous errors
//     } catch (error) {
//       console.error('Error fetching order details:', error);
//       if (error.response && error.response.status === 403) {
//         setError('You need to login again.');
//       } else {
//         setError('Failed to fetch order details. Please try again.');
//       }
//     } finally {
//       setIsOrderDetailsLoading(false); // End loading
//     }
//   };

//   useEffect(() => {
//     const today = new Date();
//     const dayOfWeek = today.getDay();
//     const bookingForDay = getBookingDay(dayOfWeek);

//     setBookingDay(bookingForDay);
//     setIsSunday(dayOfWeek === 0);
//     setIsTuesday(dayOfWeek === 2);

//     if (jwtToken && bookingForDay) {
//       axios
//         .get(`${port}/api/menus/menu/${bookingForDay}`, {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         })
//         .then((response) => {
//           setMenuData(response.data);
//           filterItems('Veg', response.data);
//           console.log(response.data)
//           setError(null);
//         })
//         .catch((error) => {
//           console.error('Error fetching menu data:', error);
//           if (error.response && error.response.status === 403) {
//             setError('You need to login again.');
//           } else {
//             setError('Please Login Again');
//           }
//         });
//     }
//   }, [jwtToken, email]);

//   // Main useEffect to fetch latest orderId and order details on component mount
//   useEffect(() => {
//     const initializeOrder = async () => {
//       if (jwtToken && userId) {
//         const fetchedOrderId = await fetchLatestOrderId();
//         if (fetchedOrderId) {
//           await fetchOrderDetails(fetchedOrderId);
//         }
//       }
//     };
//     initializeOrder();
//   }, [jwtToken, userId]);

//   // Filtering function
//   const filterItems = (category, data = menuData) => {
//     setActiveFilter(category);
//     if (data.length === 0) return;

//     let filtered = [];
//     let menuId = null;

//     if (category === 'Veg') {
//       const vegMenu = data.find((menu) => menu.isVeg === 1);
//       filtered = vegMenu?.menuItems || [];
//       menuId = vegMenu?.menuId || null;
//     } else if (category === 'Non-Veg') {
//       const nonVegMenu = data.find((menu) => menu.isVeg === 0);
//       filtered = nonVegMenu?.menuItems || [];
//       menuId = nonVegMenu?.menuId || null;
//     } else if (category === 'Egg') {
//       const eggMenu = data.find((menu) => menu.isVeg === 2);
//       filtered = eggMenu?.menuItems || [];
//       menuId = eggMenu?.menuId || null;
//     }

//     setSelectedMenuId(menuId);
//     setFilteredItems(filtered);
//   };

//   // Handle OTP Generation
//   const handleOtp = async (e) => {
//     e.preventDefault();
//     const quantities = 1;
//     const url = `${port}/api/orders/submit?menuIds=${selectedMenuId}&quantities=${quantities}`;

//     try { 
//       const respon = await axios.post(
//         url,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         }
//       );

//       console.log('OTP Generation Response:', respon.data); // Inspect response
//       const responseData = respon.data;

//       // Adjust the regex based on your actual API response format
//       const tokenIdMatch = responseData.match(/Your token Id is -(\d+)/);
//       const usesMatch = responseData.match(/It can be used (\d+) times/);

//       setOrderResponse('Order submitted successfully.');
//       setOtpTokenId(tokenIdMatch ? tokenIdMatch[1] : '');
//       setTokenUses(usesMatch ? usesMatch[1] : '');

//       const today = new Date();
//       let validForDate;

//       if (today.getDay() === 5) { // Friday
//         validForDate = new Date(today.setDate(today.getDate() + 3)); // Next Monday
//       } else if (today.getDay() === 6) { // Saturday
//         validForDate = new Date(today.setDate(today.getDate() + 2)); // Next Monday
//       } else {
//         validForDate = new Date(today.setDate(today.getDate() + 1)); // Next day
//       }

//       const formattedBookingDate = `${validForDate.toDateString()}`;

//       setFormattedDate(formattedBookingDate);

//       // Update tokenn state to disable the button and show order details
//       setTokenn(tokenIdMatch ? tokenIdMatch[1] : '');

//       // Fetch the latest orderId and order details after OTP generation
//       const fetchedOrderId = await fetchLatestOrderId();
//       if (fetchedOrderId) {
//         await fetchOrderDetails(fetchedOrderId);
//       }

//     } catch (error) {
//       console.error('Error generating OTP:', error);
//       setError('Failed to generate Token. Please try again.');
//     }
//   };

//   return (
//     <>
//       {/* Scrolling Text */}
//       <div className="scrolling-text-container">
//         <div className="scrolling-text">
//           Check the menu after 7.30 PM | Booking Time: 12PM to 12AM(Mon. - Sat.)| Prior token must be utilized for renewal | Book only on non-holiday dates (Based on Local Holidays)
//         </div>
//       </div>
//       {/* <div className={`my-division ${quantity === 0 ? 'disabled' : ''}`}> */}
//       {/* Conditionally Render OTP Details Card */}
//       {tokenn && (
//         <div className={`otp-card  ${quantity === 0 ? 'disab' : ''}`}>
//           <div className="otp-details">
//             <div className="otp-item">
//               <p className="otp-label">Token ID</p>
//               <p className="otp-value" id='vv'>{tokenn}</p>
//             </div>
//             <div className="otp-item">
//               <p className="otp-label">Valid For </p>
//               <p className="otp-value">{formatDate(datee)}</p> {/* Formatted Date */}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Menu Container */}
//       <div className="menu-container">
//         <h1 className="menu-title">Booking for {bookingDay} Menu</h1>

//         {/* Filter Buttons */}
//         <div className="filter-buttons">
//           <button
//             onClick={() => filterItems('Veg')}
//             className={`filter-btn veg-btn ${activeFilter === 'Veg' ? 'active-veg' : ''}`}
//             disabled={isSunday}
//           >
//             Vegetarian
//           </button>
//           <button
//             onClick={() => filterItems('Egg')}
//             className={`filter-btn egg-btn ${activeFilter === 'Egg' ? 'active-egg' : ''}`}
//             disabled={!isTuesday}
//           >
//             Eggetarian
//           </button>
//           <button
//             onClick={() => filterItems('Non-Veg')}
//             className={`filter-btn nonveg-btn ${activeFilter === 'Non-Veg' ? 'active-nonveg' : ''}`}
//             disabled={!isTuesday}
//           >
//             Non-Vegetarian
//           </button>
//         </div>

//         {/* Menu List */}
//         <div className="menu-list">
//           {filteredItems.length > 0 ? (
//             filteredItems.map((menuItem, index) => (
//               <div
//                 key={index}
//                 className={`menu-item-card`} // Add a disabled class on Sunday if needed
//               >
//                 <h2 className="item-name">{menuItem.item.itemName}</h2>
//                 <p className="item-category">
//                   Category: {menuItem.item.category.categoryName}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <>
//               <p className="no-items-found">No items found for {activeFilter}</p>
//               <p className="no-items-found">{error}</p>
//             </>
//           )}
//         </div>

//         {/* Generate OTP Button */}
//         <div className="generate-otp-section">
//           <button
//             onClick={handleOtp}
//             className="generate-otp-btn"
//             disabled={quantity === 1 || isSunday} // Disable button if tokenn is not null
//             style={{
//               backgroundColor: quantity === 1 ? '#ccc' : '#3498DB',
//               cursor: quantity === 1 ? 'not-allowed' : 'pointer', // Change cursor
//               color: quantity === 1 ? '#000' : '#ffffff',
//             }}
//             title={quantity === 1 ? 'You have already generated an OTP.' : 'Click to generate OTP'} // Tooltip for better UX
//           >
//             {quantity === 1 ? 'Token Already Generated' : 'Generate Token'}
//           </button>

//           {/* Display order submission details */}
//           {orderResponse && (
//             <div className="order-response">
//               <p>{orderResponse}</p>
//               <p>Token Id: {tokenn}</p>
//               <p>{formatDate(datee)}</p>
//             </div>
//           )}
//         </div>

//         {/* Display Error Message if any */}
//         {error && (
//           <div className="error-message">
//             <p>{error}</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Menu;





import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import '../Styles/menu.css'; // Import the CSS file for styling
import { port } from '../port/portno';
import { FaTruckField } from 'react-icons/fa6';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import Calender from './Cal';
import 'react-datepicker/dist/react-datepicker.css';
import { RiDeleteBin5Fill } from "react-icons/ri";
import Delpopup from './Delpopup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Menu() {
  // State Variables
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Veg');
  const [error, setError] = useState(null);
  const [bookingDay, setBookingDay] = useState('');
  const [otp, setOtp] = useState(null);
  const [isSunday, setIsSunday] = useState(false);
  const [isTuesday, setIsTuesday] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [orderResponse, setOrderResponse] = useState('');
  const [setresponse, setResponse] = useState([]);
  const [otpTokenId, setOtpTokenId] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [tokenUses, setTokenUses] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [tokenn, setTokenn] = useState(null);
  const [datee, setDate] = useState(null);
  const [isOrderDetailsLoading, setIsOrderDetailsLoading] = useState(false);
  const [quantity, setQuantity] = useState(); // Initialized to 1
  const [open, setOpen] = React.useState(false);
  const [openSnachbar, setOpenSnachbar] = React.useState(false);
  const [ignored,forceUpdate] = useReducer(x => x + 1, 0);
  const [selectedDate, setDatee] = useState(null);
  const [tokenGenerationValid, setTokenGenerationValid] = useState(false);


  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1
  // };

  // starts date
   console.log(datee)
  const BucketOptions=[]

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  const handleClick = num => {
    // 👇️ take the parameter passed from the Child component
    setDatee(convert(num));
  };
  
  const diffToast = () => {
    setTimeout(() => {
      console.log('This will run after 1 second!')
      setTokenn('')
      navigate('/')
    }, 4000);
    // setOpenSnachbar(true);
    toast("Your order has been cancelled successfully.");
  }

  // ends date

  


  // Redux Selectors
  const jwtToken = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email); // Get the logged-in user's email
  const dispatch = useDispatch();
console.log(orderDetails)
  console.log(selectedMenuId);

  // Decode JWT to get userId
  let decode;
  let userId;

  if (jwtToken) {
    try {
      decode = jwtDecode(jwtToken);
      userId = decode.userId; // Ensure 'userId' exists in the token
    } catch (error) {
      console.error('Error decoding JWT:', error);
      setError('Invalid authentication token.');
    }
  } else {
    console.warn('JWT token is missing.');
    setError('Authentication token is missing.');
  }

  // Helper Functions
  const getDayName = (dayIndex) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  };

  // Updated Helper Function to Determine Booking Day
  const determineBookingDay = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
    let bookedDayDate;

    if (currentDay >= 1 && currentDay <= 4) {
      // Monday to Thursday: Book for the next day
      bookedDayDate = new Date(today);
      bookedDayDate.setDate(today.getDate() + 1);
    } else if (currentDay === 5 || currentDay === 6) {
      // Friday or Saturday: Book for Monday
      const daysToAdd = 8 - currentDay; // 5 (Friday) +3=Monday, 6 (Saturday)+2=Monday
      bookedDayDate = new Date(today);
      bookedDayDate.setDate(today.getDate() + daysToAdd);
    } else {
      // Sunday: Book for Monday
      bookedDayDate = new Date(today);
      bookedDayDate.setDate(today.getDate() + 1);
    }

    const options = { weekday: 'long' };
    const bookedDayName = bookedDayDate.toLocaleDateString('en-US', options);

    return bookedDayName;
  };

  // Define the menu mapping based on the booking day
  const menuDataMap = {
    Monday: {
      veg: 1,
    },
    Tuesday: {
      veg: 2,
    },
    Wednesday: {
      veg: 3,
      nonVeg: 4,
      egg: 5,
    },
    Thursday: {
      veg: 6,
    },
    Friday: {
      veg: 7,
    },
    // If needed, handle Saturday and Sunday
    // Sunday: { veg: 8 },
  };

  // Updated Helper function to format date with special logic
  const formatDate = (isoString) => {
    if (!isoString) return 'Invalid Date';

    const date = new Date(isoString);
    if (isNaN(date)) return 'Invalid Date';

    const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // if (day === 5) { // Friday
    //   date.setDate(date.getDate() + 3); // Next Monday
    // } else if (day === 6) { // Saturday
    //   date.setDate(date.getDate() + 2); // Next Monday
    // } else {
    //   date.setDate(date.getDate() + 1); // Next day
    // }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Function to map menuId to menuType
  const getMenuTypeFromMenuId = (menuId) => {
    for (const day in menuDataMap) {
      for (const type in menuDataMap[day]) {
        if (menuDataMap[day][type] === menuId) {
          return type;
        }
      }
    }
    return null;
  };

  // Fetch the latest order ID
  const fetchLatestOrderId = async () => {
    try {
      const response = await axios.get(`${port}/api/orders/latest/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log(response);
      const fetchedOrderId = response.data?.orderId;
      if (fetchedOrderId) {
        setOrderId(fetchedOrderId); // Update orderId after fetching
        setError(null); // Clear any previous errors
        return fetchedOrderId;
      } else {
        console.warn('No order ID found in the response.');
        setError('No order ID found.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
      if (error.response && error.response.status === 403) {
        setError('You need to login again.');
      } else {
        setError('Failed to fetch order data. Please try again.');
      }
      return null;
    }
  };

  // Fetch order details based on orderId
  const fetchOrderDetails = async (fetchedOrderId) => {
    try {
      setIsOrderDetailsLoading(true); // Start loading
      const response = await axios.get(`${port}/api/order-details/user?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      // Extract menuId from response
      const fetchedMenuId = response.data.menuId; //check
      const fetchedMenuType = getMenuTypeFromMenuId(fetchedMenuId);//no
      console.log(response,")))))))))))))")

      // Update orderDetails with menuType
      setOrderDetails({ ...response.data, menuType: fetchedMenuType });
      setTokenn(response.data.token || null); // Update tokenn based on fetched order details
      setDate(response.data.deliveryDate);
      setQuantity(response.data.quantity); // Update quantity
      setError(null); // Clear any previous errors
      console.log(response.data,"++++++++++++++++++++++++")
      const BucketOptions = response.data.map((item) => ({
        token: item.token,
        quantity: item.orderQtyCount,
        date12: item.deliveryDate
      }));
      setResponse(BucketOptions);
    } catch (error) {
      console.error('Error fetching order details:', error);
      if (error.response && error.response.status === 403) {
        setError('You need to login again.');
      } else {
        setError('Failed to fetch order details. Please try again.');
      }
    } finally {
      setIsOrderDetailsLoading(false); // End loading
    }
  };

  useEffect(() => {
    // Determine booking day using the updated logic
    const bookingForDay = determineBookingDay();

    setBookingDay(bookingForDay);
    setIsSunday(new Date().getDay() === 0);
    setIsTuesday(new Date().getDay() === 2);

    if (jwtToken && bookingForDay) {
      axios
        .get(`${port}/api/menus/menu/${bookingForDay}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((response) => {
          setMenuData(response.data);
          filterItems('Veg', response.data);
          console.log(response.data);
          setError(null);
        })
        .catch((error) => {
          console.error('Error fetching menu data:', error);
          if (error.response && error.response.status === 403) {
            setError('You need to login again.');
          } else {
            setError('Please Login Again');
          }
        });
    }
  }, [jwtToken, email]);

  // Main useEffect to fetch latest orderId and order details on component mount
  useEffect(() => {
    const initializeOrder = async () => {
      if (jwtToken && userId) {
        const fetchedOrderId = await fetchLatestOrderId();
        if (fetchedOrderId) {
          await fetchOrderDetails(fetchedOrderId);
        }
      }
    };
    initializeOrder();
    const checkTokenValidity = () =>{
      console.log("called=====", tokenGenerationValid)
      {setresponse.filter((row) => new Date(row.date12+"Z") === new Date()).map((row,index)=>(
        console.log("True============"),
        setTokenGenerationValid(true)
        
      ))}

    }
    checkTokenValidity();
    console.log(tokenGenerationValid,"OOOOOOOOOOOOOOOOO")
  }, [jwtToken, userId, tokenGenerationValid]);

  // Filtering function
  const filterItems = (category, data = menuData) => {
    setActiveFilter(category);
    if (data.length === 0) return;

    let filtered = [];
    let menuId = null;

    if (category === 'Veg') {
      const vegMenu = data.find((menu) => menu.isVeg === 1);
      filtered = vegMenu?.menuItems || [];
      menuId = vegMenu?.menuId || null;
    } else if (category === 'Non-Veg') {
      const nonVegMenu = data.find((menu) => menu.isVeg === 0);
      filtered = nonVegMenu?.menuItems || [];
      menuId = nonVegMenu?.menuId || null;
    } else if (category === 'Egg') {
      const eggMenu = data.find((menu) => menu.isVeg === 2);
      filtered = eggMenu?.menuItems || [];
      menuId = eggMenu?.menuId || null;
    }

    setSelectedMenuId(menuId);
    setFilteredItems(filtered);
  };

  // Handle OTP Generation
  const handleOtp = async (e) => {
    e.preventDefault();
    const quantities = 1;
    const url = `${port}/api/orders/submit?menuIds=${selectedMenuId}&quantities=${quantities}&deliveryDate=${selectedDate}`;
    try {
      const respon = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log('OTP Generation Response:', respon.data); // Inspect response
      const responseData = respon.data;

      // Adjust the regex based on your actual API response format
      const tokenIdMatch = responseData.match(/Your tokens are:\s*(\d+)/);
      const usesMatch = responseData.match(/It can be used (\d+) times/);

      console.log(tokenIdMatch,"11111111111")


      setOrderResponse('Order submitted successfully.');
      setOtpTokenId(tokenIdMatch ? tokenIdMatch[1] : '');
      setTokenUses(usesMatch ? usesMatch[1] : '');

      const today = new Date();
      let validForDate;

      if (today.getDay() === 5) { // Friday
        validForDate = new Date(today.setDate(today.getDate() + 3)); // Next Monday
      } else if (today.getDay() === 6) { // Saturday
        validForDate = new Date(today.setDate(today.getDate() + 2)); // Next Monday
      } else {
        validForDate = new Date(today.setDate(today.getDate() + 1)); // Next day
      }

      const formattedBookingDate = `${validForDate.toDateString()}`;

      // setFormattedDate(formattedBookingDate);
      setFormattedDate(selectedDate);


      // Update tokenn state to disable the button and show order details
      setTokenn(tokenIdMatch ? tokenIdMatch[1] : '');

      // Fetch the latest orderId and order details after OTP generation
      const fetchedOrderId = await fetchLatestOrderId();
      if (fetchedOrderId) {
        await fetchOrderDetails(fetchedOrderId);
      }

    } catch (error) {
      console.error('Error generating OTP:', error);
      setError('Failed to generate Token. Please try again.');
    }
  };

  const handleClickOpen = (e, val) => {
    e.preventDefault();
    setOpen(true);
    setTokenn(val);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSnachbar(false);
  };


  const handleYes = async (e,val) => {
    e.preventDefault();
    console.log(val)

    try {
      // Prepare the request data
      let data = JSON.stringify({
        token: val, // Pass token
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
        // setTokenn('');
        // alert("Order Cancelled!")
        // setOpenSnachbar(true);
        setOpen(false);
        // forceUpdate();

        // Navigate to login page
        diffToast();
        // navigate('/home');
        // window.location.reload();

      } else {
        setError('Failed to cancel order. Please try again.');
      }
    } catch (error) {
      // Log error for debugging
      console.error('Error cancelling order:', error);

      if (error.response?.status === 500) {
        setError('Invalid.');
      } else {
        setError('An error occurred while cancelling the order. Please try again.');
      }
    }
  };

  return (
    <>
      {/* Scrolling Text */}
      <div className="scrolling-text-container">
        <div className="scrolling-text">
          Check the menu after 7.30 PM | Booking Time: 12PM to 12AM(Mon. - Sat.)| Prior token must be utilized for renewal | Book only on non-holiday dates (Based on Local Holidays)
        </div>
      </div>

      {/* starts delete-slider-toaster */}
      
      {/* Conditionally Render OTP Details Card */}

      {/* <div className="slider-container">
      <Slider {...settings}> */}
      <Carousel>
        {setresponse.filter((row) => row.quantity === 1).map((row,index)=>(
          <div className={"otp-card"}>
          <div className="otp-details">
            <div className="otp-item">
              <p className="otp-label">Token ID</p>
              <p className="otp-value" id='vv'>{row.token}</p>
            </div>
            <div className="otp-item">
              <p className="otp-label">Valid For </p>
              <p className="otp-value">{formatDate(row.date12)}</p> {/* Formatted Date */}
            </div>
           
          </div>
          
            {/* <Delpopup tok={{ token: tokenn }}/> */}
          <div>
            <div className='del-icon'>
            <Button variant="outlined" onClick={(event) => handleClickOpen(event,row.token)}>
              <RiDeleteBin5Fill/>
            </Button>
            </div>
          </div>
      </div>
        ))}
        </Carousel>
      {/* </Slider></div> */}


      <Snackbar
        open={openSnachbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Your order has been cancelled successfully."
        // action={action}
      />
      <ToastContainer />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to cancel the order?"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={(event) => handleYes(event,tokenn)}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      
    {/* ends delete-slider-toaster */}
        
        

      {/* Menu Container */}
      <div className="menu-container">
        {/* <h1 className="menu-title">Booking for {bookingDay} Menu</h1> */}
          <Calender passdata={handleClick}/>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button
            onClick={() => filterItems('Veg')}
            className={`filter-btn veg-btn ${activeFilter === 'Veg' ? 'active-veg' : ''}`}
            disabled={
              isSunday ||
              (menuDataMap[bookingDay] &&
                Object.keys(menuDataMap[bookingDay]).length === 1 &&
                !menuDataMap[bookingDay].veg)
            }
            title={
              menuDataMap[bookingDay] &&
              Object.keys(menuDataMap[bookingDay]).length === 1
                ? 'Only Vegetarian menu is available.'
                : 'Vegetarian Menu'
            }
          >
            Vegetarian
          </button>
          <button
            onClick={() => filterItems('Egg')}
            className={`filter-btn egg-btn ${activeFilter === 'Egg' ? 'active-egg' : ''}`}
            disabled={!isTuesday || (menuDataMap[bookingDay] && !menuDataMap[bookingDay].egg)}
            title={
              !isTuesday || (menuDataMap[bookingDay] && !menuDataMap[bookingDay].egg)
                ? 'Egg Menu is not available.'
                : 'Egg Menu'
            }
          >
            Eggetarian
          </button>
          <button
            onClick={() => filterItems('Non-Veg')}
            className={`filter-btn nonveg-btn ${activeFilter === 'Non-Veg' ? 'active-nonveg' : ''}`}
            disabled={!isTuesday || (menuDataMap[bookingDay] && !menuDataMap[bookingDay].nonVeg)}
            title={
              !isTuesday || (menuDataMap[bookingDay] && !menuDataMap[bookingDay].nonVeg)
                ? 'Non-Vegetarian Menu is not available.'
                : 'Non-Vegetarian Menu'
            }
          >
            Non-Vegetarian
          </button>
        </div>

        {/* Menu List */}
        <div className="menu-list">
          {filteredItems.length > 0 ? (
            filteredItems.map((menuItem, index) => (
              <div
                key={index}
                className={`menu-item-card`} // Add a disabled class on Sunday if needed
              >
                <h2 className="item-name">{menuItem.item.itemName}</h2>
                <p className="item-category">
                  {/* Category: {menuItem.item.category.categoryName} */}
                </p>
              </div>
            ))
          ) : (
            <>
              <p className="no-items-found">No items found for {activeFilter}</p>
              <p className="no-items-found">{error}</p>
            </>
          )}
        </div>

        {/* Generate OTP Button */}
        <div className="generate-otp-section">
          <button
            onClick={handleOtp}
            className="generate-otp-btn"
            disabled = {tokenGenerationValid}
            // disabled={ isSunday} // Disable button if quantity is 1 or it's Sunday
            style={{
              backgroundColor: quantity === 1 || isSunday ? '#ccc' : '#3498DB',
              cursor: quantity === 1 || isSunday ? 'not-allowed' : 'pointer', // Change cursor
              color: quantity === 1 || isSunday ? '#000' : '#ffffff',
            }}
            title={
              quantity === 1 || isSunday
                ? 'You have already generated an OTP or booking is not allowed today.'
                : 'Click to generate OTP'
            } // Tooltip for better UX
          >
            {tokenGenerationValid ? 'Token Already Generated' : isSunday ? 'Booking Not Allowed Today' : 'Generate Token'}
          </button>

          {/* Display order submission details */}
          {orderResponse && (
            <div className="order-response">
              <p>{orderResponse}</p>
              <p>Token Id: {otpTokenId}</p>
              <p>{formattedDate}</p>
            </div>
          )}
        </div>

        {/* Display Error Message if any */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Menu;
