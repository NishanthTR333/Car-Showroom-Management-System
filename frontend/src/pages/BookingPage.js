import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 

function BookingPage() {
  // Use decodeURIComponent to handle names with spaces like "The BMW X3"
  const { carName: encodedCarName } = useParams(); 
  const carName = decodeURIComponent(encodedCarName);
  const navigate = useNavigate();
  
  const [car, setCar] = useState(null);
  const [tid, setTid] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        // Ensure carName is properly encoded for the API call URL
        const res = await axios.get(`/api/cars/${encodeURIComponent(carName)}`); 
        setCar(res.data);
      } catch (err) {
        console.error("Error fetching car:", err);
        setError("Failed to load car details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [carName]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("You must be logged in to book.");
        navigate('/login');
        return;
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user.id;

      await axios.post('/api/orders', {
        userId: userId,
        carName: car.name,
        transactionId: tid
      });
      navigate('/booking-success');

    } catch (err) {
      console.error("Booking failed:", err);
      setError(err.response?.data?.error || "Booking failed. Please try again."); // Show specific backend error if available
    }
  };

  if (loading) return <div style={{textAlign: 'center', marginTop: '5rem'}}>Loading car...</div>;
  if (error && !car) return <div style={{ color: 'red', textAlign: 'center', marginTop: '5rem' }}>{error}</div>; // Show error if car failed to load
  if (!car) return <div style={{textAlign: 'center', marginTop: '5rem'}}>Car not found.</div>;

  // --- ENSURE className="bgpay" is present ---
  return (
    <div className="bgpay"> 
      {/* --- TODO: Add Navbar Component Here --- */}
      {/* <Navbar /> */}

      <div style={{ paddingTop: '80px' }}> {/* Padding to clear navbar */}
        
        {/* These classes should already be applied correctly */}
        <div className="carbgl"> 
          <img src={car.img.replace('..', '')} alt={car.name} />
        </div>
        <div className="carbgr"> 
          <div style={{ marginLeft: '10%' }}>
            <h1>{car.name}</h1>
            <h3>Price: Rs. {car.price}</h3>
            <h3>Cars Available: {car.availcars}</h3>
          </div>
        </div>

        {/* These classes should also be applied correctly */}
        <div className="paymentbg" style={{ marginTop: '50px', clear: 'both' }}> 
          <h1>Confirm Your Booking</h1>
          <form onSubmit={handleBooking} style={{ padding: '20px' }}>
            <p style={{textAlign: 'center'}}>Enter Transaction ID (Placeholder):</p>
            <input 
              type="text" 
              name="tid" 
              value={tid}
              onChange={(e) => setTid(e.target.value)}
              className="inputbox" 
              required 
            />
            <button type="submit" name="book" className="btnpay"> 
              Book Now
            </button>
          </form>
          {/* Display booking error */}
          {error && <p className="unable blinkerror" style={{width: 'fit-content', margin: '1rem auto'}}>{error}</p>} 
          <br /><br />
        </div>

      </div>
    </div>
  );
}
export default BookingPage;
