import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Stop the form from refreshing the page
    setError(''); // Clear any previous errors

    try {
      // Send the login request to the backend API you built
      const res = await axios.post('/api/auth/login', { id, pass });

      // If login is successful, 'res.data' will have the token
      localStorage.setItem('token', res.data.token);
      
      // We'll redirect to a 'home' page (which we'll create later)
      navigate('/home');

    } catch (err) {
      // If the server sent an error (like "Wrong Password")
      setError(err.response.data.error);
    }
  };

  return (
    <div>
      {/* You can copy/paste your old HTML/CSS structure here */}
      <form onSubmit={handleLogin}>
        <h1>User Login</h1>
        <input
          type="text"
          placeholder="USERNAME"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="PASSWORD"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
        <br />
        {/* Display any error messages */}
        {error && <h2 style={{ color: 'red' }}>{error}</h2>}
        
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}
export default LoginPage;