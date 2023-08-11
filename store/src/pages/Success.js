import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Success.css';
function Success() {
    return (
        <div className="success-container">
          <FaCheckCircle className="success-icon" />
          <h2>Payment Request Successful</h2>
          <p>Success. Your Request accepted for processing. complete the promt  andwait for an SMS from MPESA shortly</p>
          <button className='btn btn-warning'><Link to="/store" className="back-to-home">continue Shopping</Link></button>
        </div>
      );
}

export default Success;