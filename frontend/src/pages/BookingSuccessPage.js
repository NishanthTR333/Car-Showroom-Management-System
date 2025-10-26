import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BookingSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to main page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/main');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="booking-page" style={{ paddingTop: '30vh' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px' }}>
        <h1 style={{ fontFamily: 'Copperplate', color: 'black', textAlign: 'center' }}>
          Your transaction was successful.
        </h1>
        <p style={{textAlign: 'center', color: 'black'}}>Redirecting you home...</p>
      </div>
    </div>
  );
}

export default BookingSuccessPage;