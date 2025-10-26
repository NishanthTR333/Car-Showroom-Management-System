import React from 'react';
import { Link } from 'react-router-dom';
// You might need to import your main CSS file
// import '../stylehome.css'; 

function BookingSuccessPage() {
  return (
    <div className="bgpay">
      <br /><br /><br /><br /><br />
      
      {/* This div has inline styles to make sure text is white */}
      <div className="transbg" style={{ textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontFamily: 'Copperplate' }}>
          Your transaction was successful.
        </h1>
        <p>Your order has been placed!</p>
        <br />
        <Link to="/home" style={{ color: 'white', fontSize: '20px' }}>
          Back to Home
        </Link>
      </div>
      
    </div>
  );
}
export default BookingSuccessPage;