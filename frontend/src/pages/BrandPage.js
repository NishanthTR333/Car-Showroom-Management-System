import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
// You can import your old brand CSS
// import '../brand/stylebmw.css';

function BrandPage() {
  // 1. Get the brand name from the URL (e.g., "bmw", "audi")
  const { brandName } = useParams();
  
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data when the component loads
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        // This calls your backend: GET /api/cars?brand=bmw
        const res = await axios.get(`/api/cars?brand=${brandName}`);
        setCars(res.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [brandName]); // Re-run this effect if the brandName in the URL changes

  // 3. Show a loading screen (replaces your 'eyes/bmw.php' etc.)
  if (loading) {
    return <div>Loading {brandName.toUpperCase()}...</div>;
  }

  // 4. Render the list of cars
  return (
    <div className="bgbmw"> {/* Reusing your old class */}
      {/* Add your Navbar here */}
      <br /><br /><br /><br /><br /><br />
      
      {cars.map((car) => (
        <div key={car.name}>
          <div className="pagebg">
            <div style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '5%' }}>
              <h1 style={{ fontFamily: 'times new roman, serif' }}>{car.name}</h1>
              <h3 style={{ fontFamily: 'times new roman, serif', color: 'rgb(70, 68, 68)' }}>{car.fuel}</h3>
              <h3 style={{ fontFamily: 'times new roman, serif', fontWeight: 'lighter' }}>Starting from ₹ {car.price}</h3>
            </div>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '30%' }}>
              {/* This is where we fix the image path!
                We remove the "../" from the path in the database.
                e.g., "../images/BMW/x3.jpg" becomes "/images/BMW/x3.jpg"
              */}
              <Link to={`/book/${car.name}`}> {/* We'll build this page next */}
                <img 
                  className="expand" 
                  src={car.img.replace('..', '')} 
                  alt={car.name} 
                />
              </Link>
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
}
export default BrandPage;