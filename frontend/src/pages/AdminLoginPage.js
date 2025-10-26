import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLoginPage() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // API Call:
    // fetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ id, pw }) })
    // .then(res => {
    //   if(res.ok) {
           navigate('/admin/dashboard');
    //   } else {
    //     return res.json().then(data => setMessage(data.message || 'Login Failed'));
    //   }
    // })
    // .catch(err => setMessage('Server error'));

    // For testing:
    if (id === 'admin' && pw === 'admin') {
      navigate('/admin/dashboard');
    } else {
      setMessage('Admin ID Not Registered or Wrong Password');
    }
  };

  return (
    <div className="bg1" style={{ minHeight: '100vh' }}>
      <div className="form-container" style={{ paddingTop: '30vh' }}>
        <form onSubmit={handleLogin}>
          <input
            className="form-input"
            type="text"
            placeholder="USERNAME"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          /><br /><br /><br />
          <input
            className="form-input"
            type="password"
            placeholder="PASSWORD"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          /><br /><br /><br />
          <button className="form-button form-button--login" type="submit">Login</button>
        </form>
        {message && <h2 className="form-message-error">{message}</h2>}
      </div>
    </div>
  );
}

export default AdminLoginPage;