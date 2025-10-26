import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
// Note: The image gallery needs a different approach in React.
// For simplicity, this uses a static image.
// A real implementation would use a library like 'react-slideshow-image'.

function MainPage() {
  const brands = [
    { name: 'Audi', logo: 'audi.png', link: '/brand/audi' },
    { name: 'BMW', logo: 'bmw.png', link: '/brand/bmw' },
    { name: 'Benz', logo: 'benz.png', link: '/brand/benz' },
    { name: 'Porsche', logo: 'porsche.png', link: '/brand/porsche' },
    { name: 'Rolls Royce', logo: 'rr.png', link: '/brand/rr' },
    { name: 'Jaguar', logo: 'jaguar.png', link: '/brand/jaguar' },
    { name: 'Lamborghini', logo: 'lamborghini.png', link: '/brand/lamborghini' },
    { name: 'Ferrari', logo: 'ferrari.png', link: '/brand/ferrari' },
  ];

  return (
    <div className="bgshowroom" style={{ minHeight: '100vh' }}>
      <Navbar />
      
      {/* Image Gallery Placeholder */}
      <div className="gallery-color-overlay" style={{ height: '600px', display: 'flex', alignItems: 'center' }}>
        <div className="gallery-container">
          <div className="image-gallery">
            <img src="/images/homepage/nav1.jpg" alt="Gallery 1" />
            {/* In a real app, this would be a slideshow component */}
          </div>
        </div>
      </div>
      
      <div style={{ paddingTop: '650px', marginLeft: '10%', marginRight: '15%' }}>
        <h1 style={{ fontSize: 'xxx-large', fontFamily: 'Didot' }} className="text-white">
          Welcome to NFS Motors
        </h1>
        <p style={{ fontSize: 'xx-large', fontFamily: 'Didot', lineHeight: '170%' }} className="text-white">
          Welcome to NFS Motors, where automotive excellence meets luxury...
        </p>
      </div>

      <br /><br /><br /><br />

      <div className="brand-selection">
        <h1 style={{ fontFamily: 'Copperplate' }}>Explore Luxury Cars by Brands</h1>
        <br />
        {brands.map(brand => (
          <Link to={brand.link} key={brand.name}>
            <button className="brand-selection__button">
              <img src={`/images/logo/${brand.logo}`} alt={brand.name} style={{ width: '60%', marginTop: '20px' }} />
              <h2 style={{ fontFamily: 'Didot' }}>{brand.name}</h2>
            </button>
          </Link>
        ))}
        <br /><br /><br />
      </div>

      <br /><br /><br /><br />
      
      <div className="insurance-section">
        <div className="insurance-section__column">
          <h1 style={{ fontFamily: 'times new roman, serif' }}>Car Warranty</h1>
          <img src="/images/homepage/warr.png" alt="Warranty" width="48%" />
          <h4 style={{ fontFamily: 'times new roman, serif', fontWeight: 'lighter' }}>
            Now Buy Warranty and Get Complete Peace of Mind
          </h4>
          <button className="insurance-section__button">
            <h2 style={{ fontFamily: 'times new roman, serif', margin: 0 }}>Know more details</h2>
          </button>
        </div>
        <div className="insurance-section__column">
          <h1 style={{ fontFamily: 'times new roman, serif' }}>Car Insurance</h1>
          <img src="/images/homepage/insura.png" alt="Insurance" width="40%" />
          <h4 style={{ fontFamily: 'times new roman, serif', fontWeight: 'lighter' }}>
            Buy Best Insurance Policy for your Luxury Car
          </h4>
          <button className="insurance-section__button">
            <h2 style={{ fontFamily: 'times new roman, serif', margin: 0 }}>Know more details</h2>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainPage;