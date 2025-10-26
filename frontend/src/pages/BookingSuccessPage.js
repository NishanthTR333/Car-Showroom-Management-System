import React from 'react';
import { Link } from 'react-router-dom';

function BookingSuccessPage() {
  // --- ENSURE className="bgpay" is present ---
  return (
    <div className="bgpay"> 
      {/* --- TODO: Add Navbar Component Here --- */}
      {/* <Navbar /> */}

      <div style={{ paddingTop: '80px' }}> {/* Padding to clear navbar */}

        {/* --- ENSURE className="transbg" is present --- */}
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
    </div>
  );
}
export default BookingSuccessPage;
