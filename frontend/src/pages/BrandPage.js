import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BrandPage() {
  const { brandName } = useParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/cars?brand=${brandName}`);
        setCars(res.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [brandName]);

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: '5rem'}}>Loading {brandName.toUpperCase()}...</div>;
  }

  // --- ADD className="bgshowroom" --- (or another background class)
  return (
    <div className="bgshowroom"> 
      {/* --- TODO: Add Navbar Component Here --- */}
      {/* <Navbar /> */}
      
      <div style={{ paddingTop: '80px' }}> {/* Add padding to clear fixed navbar */}
        <h1 style={{ color: 'white', textAlign: 'center' }}>{brandName.toUpperCase()} Cars</h1>
        
        {cars.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center' }}>No cars found for this brand.</p>
        ) : (
          cars.map((car) => (
            // --- ADD className="pagebg" ---
            <div key={car.name} className="pagebg"> 
              <div> {/* Container for text */}
                <h1 style={{ fontFamily: 'times new roman, serif' }}>{car.name}</h1>
                <h3 style={{ fontFamily: 'times new roman, serif', color: 'rgb(70, 68, 68)' }}>{car.fuel}</h3>
                <h3 style={{ fontFamily: 'times new roman, serif', fontWeight: 'lighter' }}>Starting from ₹ {car.price}</h3>
              </div>
              <div> {/* Container for image */}
                <Link to={`/book/${encodeURIComponent(car.name)}`}> {/* Encode car name for URL */}
                  {/* --- ADD className="expand" --- */}
                  <img 
                    className="expand" 
                    src={car.img.replace('..', '')} // Ensure path starts with /
                    alt={car.name} 
                  />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      <br/> {/* Add some space at the bottom */}
    </div>
  );
}
export default BrandPage;
