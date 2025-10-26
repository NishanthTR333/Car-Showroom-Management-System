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
      await axios.post('/api/auth/register', {
        id,
        name,
        pass,
        phoneno,
        mail
      });
      navigate('/login');

    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed'); // Better error handling
    }
  };

  // --- ADD className="body bg1" ---
  return (
    <div className="body bg1"> 
      <br />
      <hr className="redhead" />
      <h1 className="redtxt">Register User</h1>
      <hr className="redhead" />
      {/* --- ADD className="form" --- */}
      <form className="form" onSubmit={handleSubmit}> 
        <br /><br /><br />
        {/* --- ADD className="tb" --- */}
        <input className="tb" type="text" placeholder="Username" name="id" value={id} onChange={onChange} required />
        <br /><br /><br />
        {/* --- ADD className="tb" --- */}
        <input className="tb" type="text" placeholder="Full Name" name="name" value={name} onChange={onChange} required />
        <br /><br /><br />
        {/* --- ADD className="tb" --- */}
        <input className="tb" type="password" placeholder="Password" name="pass" value={pass} onChange={onChange} required />
        <br /><br /><br />
        {/* --- ADD className="tb" --- */}
        <input className="tb" type="text" placeholder="Phone Number" name="phoneno" value={phoneno} onChange={onChange} required />
        <br /><br /><br />
        {/* --- ADD className="tb" --- */}
        <input className="tb" type="email" placeholder="Email" name="mail" value={mail} onChange={onChange} required />
        <br /><br /><br />
        {/* --- ADD className="btn" --- */}
        <button className="btn" type="submit">Register</button>
        <br/><br/>
        
        {/* --- ADD className="unable blinkerror" --- */}
        {error && <h2 className="unable blinkerror">{error}</h2>}

        <p style={{textAlign: 'center', marginTop: '1rem'}}> {/* Added inline style for centering */}
          {/* --- ADD className="redlink" --- */}
          Already have an account? <Link className="redlink" to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}
export default RegisterPage;