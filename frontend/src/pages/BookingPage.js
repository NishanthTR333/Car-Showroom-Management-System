import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookingPage() {
  const { carName } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1); // 1 = details, 2 = payment
  const [tid, setTid] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // API Call: Get details for this specific car
    // fetch(`/api/car/${carName}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setCar(data);
    //     setLoading(false);
    //   })
    //   .catch(err => setLoading(false));

    // For testing:
    setCar({
      name: carName,
      price: '8,800,000',
      availcars: 5,
      img: `/images/audi/q7.png` // Placeholder image
    });
    setLoading(false);
  }, [carName]);

  const handleBookNow = () => {
    // This just moves to the "payment" step
    setStep(2); 
  };
  
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // API Call: Submit the transaction ID and book the car
    // fetch('/api/book-car', { method: 'POST', body: JSON.stringify({ carName, tid }) })
    // .then(res => {
    //   if(res.ok) {
           navigate('/booking-success');
    //   } else {
    //     setMessage('Booking failed. Please try again.');
    //   }
    // })
    // .catch(err => setMessage('Server error'));

    // For testing
    navigate('/booking-success');
  };

  if (loading) {
    return <div className="booking-page"><h1 style={{ color: 'white' }}>Loading...</h1></div>;
  }

  if (!car) {
    return <div className="booking-page"><h1 style={{ color: 'white' }}>Car not found.</h1></div>;
  }

  return (
    <div className="booking-page">
      {step === 1 && (
        <div className="booking-card">
          <div className="booking-card__image-wrapper">
            <img src={car.img} alt={car.name} />
          </div>
          <div className="booking-card__info">
            <h1>{car.name}</h1>
            <h3>Price: Rs. {car.price}</h3>
            <h3>Cars Available: {car.availcars}</h3>
            <button className="insurance-section__button" onClick={handleBookNow}>
              Book Now
            </button>
            <br /><br />
          </div>
        </div>
      )}
      
      {step === 2 && (
         <div className="payment-form-container">
            <h1 style={{ fontFamily:'Roboto', color: 'rgb(222, 60, 2)', textAlign: 'center' }}>
              Your transaction was successful.
            </h1>
            <form onSubmit={handlePaymentSubmit} style={{textAlign: 'center'}}>
              <p>Transaction ID: </p>
              <input 
                type="text" 
                name="tid" 
                className="form-input" 
                value={tid}
                onChange={(e) => setTid(e.target.value)}
              />
              <br/><br/>
              <button type="submit" name="book" className="payment-button"></button>
            </form>
            {message && <p style={{color: 'red', textAlign: 'center'}}>{message}</p>}
            <br/><br/>
          </div>
      )}
    </div>
  );
}

export default BookingPage;