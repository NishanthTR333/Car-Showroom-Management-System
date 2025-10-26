import React, { useState } from 'react';

function LoginPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Stop the form from reloading the page
    setMessage('Logging in...');

    try {
      // This is the "fetch" call to your new backend API
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, pw }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle errors from the server (e.g., "Wrong Password")
        throw new Error(data.message || 'Something went wrong');
      }

      // Success!
      setMessage(data.message);
      // Here you would save the user token and redirect to the main page

    } catch (err) {
      setMessage(err.message); // Show the error (e.g., "User ID Not Registered")
    }
  };

  // This is JSX, which looks like HTML
  // You can adapt your form from user_login.php
  return (
    <div className="bg1"> {/* This class is still global */}
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <input
            className="form-input"
            type="text"
            placeholder="USERNAME"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <br /><br /><br />
          <input
            className="form-input" // Use the new consolidated class
            type="password"
            placeholder="PASSWORD"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
          <br /><br /><br />
          <button className="form-button form-button--login" type="submit">Login</button>
        </form>
        {message && <h2 className="form-message-error">{message}</h2>} {/* Display login status */}
      </div>
    </div>
  );
}

export default LoginPage;