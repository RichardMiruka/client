import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './FailedPage.css';
function Cancel() {
    return (
        <div className="error-container">
          <FaTimesCircle className="error-icon" />
          <p className="error-message">Payment Failed</p>
          <p>Sorry, the payment was not successful.</p>
          <Link to="/" className="back-to-home">Back to Home</Link>
        </div>
      );
}

export default Cancel;