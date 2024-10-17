import '../Styles/footer.css'


import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { BiLogoPlayStore } from "react-icons/bi";
import { FaAppStore } from "react-icons/fa";

const Footer = () => {
  let currentYear = new Date().getFullYear()
  return (
    <>
      <div className="ff" style={{height:"100%"}}>
      <footer>
        <div className="container">
          <div className="sec">
            <img
              src="./images/amd.png"  alt="logo"
            />
            {/* <span>SOULFIT</span> */}

            <p style={{fontFamily:"Playfair Display, system-ui"}}>
     
            Amddas Foods specializes in delivering fresh, delicious meals to companies, offering convenient, nutritious, and high-quality food options to keep employees satisfied and energized throughout the day.
            </p>
            <ul className="sci">
              <li>
                <Link>
                  <FaFacebookF style={{color:'darkblue'}}/>
                </Link>
              </li>
              <li>
                <Link>
                  <FaInstagram style={{color:'red'}}/>
                </Link>
              </li>
              <li>
                <Link>
                  <FaYoutube style={{color:'red'}}/>
                </Link>
              </li>
              <li>
                <Link>
                  <FaXTwitter style={{color:'black'}}/>
                </Link>
              </li>
            </ul>
          </div>
        <div className="gggg">
        {/* <div className="quicklinks">
            <h2>Quick Links <div className="underline"><span></span></div></h2>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={""}>About</Link>
              </li>
              <li>
                <Link>Services</Link>
              </li>
              <li>
                <Link to=''>Contact</Link>
              </li>
            </ul>
          </div> */}
          <div className="contact">
            <h2>Contact Us </h2>
            {/* <div className="underline"><span></span></div> */}
            <ul className="info" style={{fontFamily: "Raleway, sans-serif"}}>
              <li>
                <span>
                <FaPhoneAlt />

                </span>
                <p>
                  <a href="tel:+919632764963">Call us at +91-9632764963</a>
                </p>
              </li>
              <li>
                <span>
               <MdEmail/>
                </span>
                <p>
                  <a href="mailto:info@amddas.net">info@amddas.net</a>
                </p>
              </li>
              <li>
                <span>
                <IoLocationSharp/>
                </span>
                <p>
                  <a href="https://maps.app.goo.gl/fYZzn7KQt2BfN2us5">AMDDAS FOODS PVT ltd SY NO : 67, SEEGEHALLI VILLAGE, BIDARAHALLI HOBLI BENGALURU EAST TALUK, BANGALORE-67</a>
                </p>
              </li>
            </ul>
          </div>


          <div className="quicklinks">
            {/* <h2>Get Our App</h2> */}
            {/* <div className="underline"><span></span></div> */}
          {/* <Link style={{textDecoration:"none"}}> */}
          {/* < BiLogoPlayStore  className='lp'/> */}


          {/* <h1 >Cooming Soon</h1> */}
          {/* </Link> */}
          {/* <Link>
          < FaAppStore  className='lp'/>
          </Link> */}


          
          </div>
        </div>

        </div>
      </footer>

      <a href="#" id="scroll">
        <span></span>
      </a>
      <div className="copyrighttext">
        <p>
          copyright © {currentYear} Designed by{" "}
          <a href="https://sugaam.in " target="_blank">Sugaam.in</a> All Rights Reserved
        </p>
      </div>
    </div>
    </>
  );
};

export default Footer;
