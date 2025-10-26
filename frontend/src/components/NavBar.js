import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link className="navbar__link" to="/main">Home</Link>
      <Link className="navbar__link" to="/about">About</Link>
      <Link className="navbar__link" to="/listings">Listings</Link>
      <Link className="navbar__link" to="/contact">Contact Us</Link>
    </nav>
  );
}

export default Navbar;