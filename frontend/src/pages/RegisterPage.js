import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  
  // Form fields
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [number, setNumber] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('Registering...');

    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          name,
          dob,
          number,
          mail,
          password // We are now sending the password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to Register');
      }

      // Success!
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login'); // Go to login page
      }, 2000);

    } catch (err) {
      setMessage(err.message); // Show error (e.g., "username taken")
    }
  };

  return (
    <div className="bg1" style={{ minHeight: '100vh', paddingTop: '1px' }}>
      <div className="form-container" style={{ paddingTop: '10vh' }}>
        <hr className="divider-line" />
        <h1 className="text-red center-text">Register User</h1>
        <hr className="divider-line" />
        
        <form onSubmit={handleRegister}>
          <br /><br />
          <input
            className="form-input"
            type="text"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /><br /><br /><br />
          
          <input
            className="form-input"
            type="text"
            placeholder="FULL NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          /><br /><br /><br />
          
          <input
            className="form-input"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          /><br /><br /><br />
          
          <input
            className="form-input"
            type="tel"
            placeholder="MOBILE NUMBER"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          /><br /><br /><br />
          
          <input
            className="form-input"
            type="email"
            placeholder="MAIL ID"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          /><br /><br /><br />

          <input
            className="form-input"
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br /><br /><br />

          <button className="form-button" type="submit">Register</button>
        </form>
        {message && (
          <h2 className={message.includes('successful') ? 'form-message-success' : 'form-message-error'}>
            {message}
          </h2>
        )}
        <br/>
        <Link to="/login" className="form-link" style={{fontSize: '1.2rem'}}>Already have an account? Login</Link>
      </div>
    </div>
  );
}

export default RegisterPage;