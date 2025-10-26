import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <Link to="/admin">
        <button className="footer__admin-login-button">Admin Login</button>
      </Link>
    </footer>
  );
}

export default Footer;