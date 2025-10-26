import React from 'react';
import { Link } from 'react-router-dom';
// You can import your old CSS here if you want
// import '../stylehome.css'; 

function HomePage() {
  // This logic is from your main.php
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

  return (
    <div>
      {/* You can add your navbar and image slider here later */}
      
      <div className="brandsel"> {/* Reusing your class from main.php */}
        <h1 style={{ fontFamily: 'Copperplate' }}>Explore Luxury Cars by Brands</h1>
        
        {brands.map((brand) => (
          <Link key={brand.path} to={`/cars/${brand.path}`}>
            {/* This Link component creates a link to "/cars/audi", "/cars/bmw", etc.
              It navigates to your new BrandPage component.
            */}
            <button className="brandselbtn">
              <img src={brand.logo} alt={brand.name} style={{ width: '80%' }} />
              <h2 style={{ fontFamily: 'Didot' }}>{brand.name}</h2>
            </button>
          </Link>
        ))}
        
      </div>
    </div>
  );
}
export default HomePage;