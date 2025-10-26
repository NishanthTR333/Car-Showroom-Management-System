import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // <-- Import the decoder

// You can import your old CSS
// import '../stylehome.css';

function BookingPage() {
  const { carName } = useParams(); // Get car name from URL (e.g., "The BMW X3")
  const navigate = useNavigate();
  
  const [car, setCar] = useState(null);
  const [tid, setTid] = useState(''); // State for the transaction ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch this specific car's data
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        // Use the new backend route
        const res = await axios.get(`/api/cars/${carName}`);
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

  // 2. Handle the booking submission
  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Get the user's token from storage
      const token = localStorage.getItem('token');
      if (!token) {
        setError("You must be logged in to book.");
        navigate('/login');
        return;
      }

      // Decode the token to get the user's ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user.id;

      // Send the data to your POST /api/orders endpoint
      await axios.post('/api/orders', {
        userId: userId,
        carName: car.name,
        transactionId: tid
      });

      // Redirect to a success page
      navigate('/booking-success');

    } catch (err) {
      console.error("Booking failed:", err);
      setError("Booking failed. Please try again.");
    }
  };

  if (loading) return <div>Loading car...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!car) return <div>Car not found.</div>;

  // 3. Render the page (layout from book.php)
  return (
    <div className="bgpay"> {/* Using your class from stylehome.css */}
      <br /><br /><br /><br /><br />
      
      {/* This part is from book.php */}
      <div className="carbgl">
        <img src={car.img.replace('..', '')} alt={car.name} height="430px" />
      </div>
      <div className="carbgr">
        <div style={{ marginLeft: '10%' }}>
          <h1>{car.name}</h1>
          <h3>Price: Rs. {car.price}</h3>
          <h3>Cars Available: {car.availcars}</h3>
        </div>
      </div>

      {/* This part is from book1.php */}
      <div className="paymentbg" style={{ marginTop: '50px', clear: 'both' }}>
        <h1 style={{ textAlign: 'center' }}>Confirm Your Booking</h1>
        <form onSubmit={handleBooking} style={{ padding: '20px' }}>
          <p>Transaction ID:</p>
          <input 
            type="text" 
            name="tid" 
            value={tid}
            onChange={(e) => setTid(e.target.value)}
            className="inputbox" // Assuming this class exists
            required 
          />
          <button type="submit" name="book" className="btnpay">
            Book Now
          </button>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <br /><br />
      </div>

    </div>
  );
}
export default BookingPage;