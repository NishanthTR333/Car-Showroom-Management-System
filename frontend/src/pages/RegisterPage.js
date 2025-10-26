import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    pass: '',
    phoneno: '',
    mail: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { id, name, pass, phoneno, mail } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Send the register request to the backend API
      await axios.post('/api/auth/register', {
        id,
        name,
        pass,
        phoneno,
        mail
      });

      // If successful, redirect to the login page
      navigate('/login');

    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register User</h1>
        <input type="text" placeholder="Username" name="id" value={id} onChange={onChange} required />
        <br />
        <input type="text" placeholder="Full Name" name="name" value={name} onChange={onChange} required />
        <br />
        <input type="password" placeholder="Password" name="pass" value={pass} onChange={onChange} required />
        <br />
        <input type="text" placeholder="Phone Number" name="phoneno" value={phoneno} onChange={onChange} required />
        <br />
        <input type="email" placeholder="Email" name="mail" value={mail} onChange={onChange} required />
        <br />
        <button type="submit">Register</button>
        
        {error && <h2 style={{ color: 'red' }}>{error}</h2>}

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}
export default RegisterPage;