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
      <button className='btn btn-warning'><Link to="/store" className="back-to-home">continue Shopping</Link></button>

    </div>
  );
}

export default Cancel;