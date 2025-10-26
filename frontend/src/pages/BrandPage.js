import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/NavBar';

function BrandPage() {
  const { brandName } = useParams(); // Gets 'bmw', 'audi' etc. from the URL
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // API Call: Fetch cars for the specific brand
    // fetch(`/api/cars?brand=${brandName}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setCars(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     setLoading(false);
    //   });

    // For testing:
    const testData = {
      bmw: [
        { name: 'BMW X5', fuel: 'Diesel', price: '6,850,000', img: '/images/BMW/x5.jpg' },
        { name: 'BMW M4', fuel: 'Petrol', price: '14,800,000', img: '/images/BMW/m4.png' }
      ],
      audi: [
        { name: 'Audi A4', fuel: 'Petrol', price: '4,500,000', img: '/images/audi/A4.png' },
        { name: 'Audi Q7', fuel: 'Petrol', price: '8,800,000', img: '/images/audi/q7.png' }
      ]
    };
    setCars(testData[brandName] || []);
    setLoading(false);
  }, [brandName]); // Re-run this effect if the brandName in the URL changes

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <Navbar />
      <div className="brand-page-container">
        <br /><br />
        {loading && <h1 style={{ color: 'white', textAlign: 'center' }}>Loading...</h1>}
        
        {!loading && cars.map(car => (
          <div className="brand-card" key={car.name}>
            <div className="brand-card__info">
              <h1 style={{ fontFamily: 'times new roman, serif' }}>{car.name}</h1>
              <h3 style={{ fontFamily: 'times new roman, serif', color: 'rgb(70, 68, 68)' }}>
                {car.fuel}
              </h3>
              <h3 style={{ fontFamily: 'times new roman, serif', fontWeight: 'lighter' }}>
                Starting from ₹ {car.price}
              </h3>
            </div>
            <div className="brand-card__image-container">
              <Link to={`/book/${car.name}`}>
                <img className="brand-card__image" src={car.img} alt={car.name} />
              </Link>
            </div>
          </div>
        ))}
        {!loading && cars.length === 0 && (
           <h1 style={{ color: 'white', textAlign: 'center' }}>No cars found for this brand.</h1>
        )}
      </div>
    </div>
  );
}

export default BrandPage;