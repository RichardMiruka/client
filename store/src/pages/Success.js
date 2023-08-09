import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Success.css';
function Success() {
    return (
        <div className="success-container">
          <FaCheckCircle className="success-icon" />
          <h2>Payment Request Successful</h2>
          <p>Success. Your Request accepted for processing. complete the promt  andwait for an SMS from MPESA shortly</p>
          <Link to="/" className="back-to-home">Back to Home</Link>
        </div>
      );
}

export default Success;