import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError(''); 

    try {
      const res = await axios.post('/api/auth/login', { id, pass });
      localStorage.setItem('token', res.data.token);
      navigate('/home'); 

    } catch (err) {
      setError(err.response?.data?.error || 'Login failed'); // Added better error handling
    }
  };

  // --- ADD className="body bg1" ---
  return (
    <div className="body bg1"> 
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> 
      {/* --- ADD className="form" --- */}
      <form className="form" onSubmit={handleLogin}> 
        {/* --- ADD className="tb" --- */}
        <input
          className="tb" 
          type="text"
          placeholder="USERNAME"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <br /><br /><br />
        {/* --- ADD className="tb" --- */}
        <input
          className="tb" 
          type="password"
          placeholder="PASSWORD"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <br /><br /><br />
        {/* --- ADD className="btn lbtn" --- */}
        <button className="btn lbtn" type="submit">Login</button>
        <br /><br /><br />
        
        {/* --- ADD className="btn btnfull" --- */}
        <Link to="/register">
          <button className="btn btnfull" type="button">
            I Dont Have an Account
          </button>
        </Link>
      </form>
      <br/><br/>

      {/* --- ADD className="unable blinkerror" --- */}
      {error && <h2 className="unable blinkerror">{error}</h2>} 
    </div>
  );
}
export default LoginPage;