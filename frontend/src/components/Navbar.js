import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  // Check if a token exists in localStorage to determine login status
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/login'); // Redirect to login page
  };

  return (
    // Use the className from your main.css
    <nav className="navbar">
      {/* Using 'marginLeft' for spacing, adjust as needed */}
      <div style={{ marginLeft: 'auto', marginRight: 'auto' }}> 
        <Link className="navlink" to="/home">Home</Link>
        {/* Add links for About, Listings, Contact Us later */}
        {/* <Link className="navlink" to="/about">About</Link> */}
        {/* <Link className="navlink" to="/listings">Listings</Link> */}
        {/* <Link className="navlink" to="/contact">Contact Us</Link> */}
        
        {/* Conditionally show Login/Logout */}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="navlink" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: 'inherit', marginLeft: '2rem' }}>
            Logout
          </button>
        ) : (
          <Link className="navlink" to="/login" style={{ marginLeft: '2rem' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;