import React, { useState, useContext } from 'react';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
function LipaNaMpesaComponent() {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const cart = useContext(CartContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalAmount = queryParams.get('total');

  const accessToken = localStorage.getItem('token');
  console.log(accessToken);

  // Decode the JWT token to get user_id
  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.usertype;
  console.log("userid"+userId)
  useState(() => {
    if (totalAmount) {
      setAmount(totalAmount);
    }
  }, [totalAmount]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePaymentSubmit = async () => {
    try {
      const requestData = {
        amount: parseFloat(amount),
        phone: phoneNumber,
      };

      const response = await fetch('http://localhost:5000/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.ResponseCode === '0') {
          // Redirect to /success if ResponseCode is 0
          navigate('/success');
          // Clear the cart after payment
          cart.clearCart();
        } else {
          // Redirect to /cancel if ResponseCode is not 0
          navigate('/cancel');
        }
      } else {
        // Handle error scenario
        console.error('Error initiating payment');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="lipa-na-mpesa-form">
      <h2>Lipa na M-Pesa Payment</h2>
      <p>Enter the amount and your phone number below to pay with M-Pesa via STK Push.</p>
      <Form>
        <FormGroup>
          <Form.Label>Amount</Form.Label>
          <FormGroup>
          <Form.Label>Total Amount</Form.Label>
          <FormControl
            type="text"
            readOnly
            value={`${totalAmount}`} // Display the total amount as reference
          />
        </FormGroup>
        </FormGroup>
        <FormGroup>
          <Form.Label>Phone Number</Form.Label>
          <FormControl
            type="tel"
            placeholder="Enter phone number in format 254"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
        </FormGroup>
        <Button onClick={handlePaymentSubmit} variant="primary" style={{ marginTop: '10px' }}>
          Pay Online
        </Button>
          </Form>
          <button className='btn btn-warning'><Link to="/store" className="back-to-home">continue Shopping</Link></button>
    
    </div>
  );
}

export default LipaNaMpesaComponent;
