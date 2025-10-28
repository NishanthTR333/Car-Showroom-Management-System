import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function HomePage() {
  const brands = [
    { name: 'Audi', logo: '/images/logo/audi.png', path: 'audi' },
    { name: 'BMW', logo: '/images/logo/bmw.png', path: 'bmw' },
    { name: 'Benz', logo: '/images/logo/benz.png', path: 'benz' },
    { name: 'Porsche', logo: '/images/logo/porsche.png', path: 'porsche' },
    { name: 'Rolls Royce', logo: '/images/logo/rr.png', path: 'rr' },
    { name: 'Jaguar', logo: '/images/logo/jaguar.png', path: 'jaguar' },
    { name: 'Lamborghini', logo: '/images/logo/lamborghini.png', path: 'lamborghini' },
    { name: 'Ferrari', logo: '/images/logo/ferrari.png', path: 'ferrari' },
  ];

  // --- ADD className="bgshowroom" ---
  return (
    <div className="bgshowroom"> 
      {/* --- TODO: Add Navbar Component Here --- */}
      <div className="bgshowroom">
      <Navbar /> {/* <-- Add Navbar here */}

      <div style={{ paddingTop: '80px', minHeight: '400px', /* ... */ }}>
        {/* ... */}
      </div>
      <div className="brandsel">
        {/* ... */}
      </div>
    </div>
      
      {/* Placeholder for the top section (image slider, welcome text) */}
      <div style={{ paddingTop: '80px', minHeight: '400px', color: 'white', textAlign: 'center' }}>
         {/* You can re-add your image slider component here */}
         <h1>Welcome to NFS Motors</h1> 
      </div>

      <div className="brandsel"> 
        <h1 style={{ fontFamily: 'Copperplate' }}>Explore Luxury Cars by Brands</h1>
        
        {brands.map((brand) => (
          <Link key={brand.path} to={`/cars/${brand.path}`}>
            <button className="brandselbtn">
              {/* Ensure logo paths start with / */}
              <img src={brand.logo} alt={brand.name} style={{ width: '80%' }} /> 
              <h2 style={{ fontFamily: 'Didot' }}>{brand.name}</h2>
            </button>
          </Link>
        ))}
      </div>
      
      {/* --- TODO: Add Insurance/Warranty and Footer sections later --- */}
      {/* <div className="insur">...</div> */}
      {/* <footer className="foot">...</footer> */}
    </div>
  );
}
export default HomePage;
