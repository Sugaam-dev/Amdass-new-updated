import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ErrorPage.css'; // You can style it further using this CSS file

const Error = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <h1>Oops! Something went wrong.</h1>
        <p>We're working to fix it.</p>

        <div className="visual-container">
          {/* You can replace this with any image or illustration */}
          <img
            src="https://www.impactbnd.com/hubfs/404-error-page-examples-best.jpg"
            alt="img"
            className="error-image"
          />
        </div>

        <div className="message-box">
          <p>
            It seems we've encountered an issue, but don't worry. We're already on it. 
            Please use the options below to navigate further.
          </p>

          <div className="buttons">
            <Link to="/" className="button">Return Login Page</Link>
         
            {/* <a href="mailto:support@example.com" className="button">Report this issue</a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
