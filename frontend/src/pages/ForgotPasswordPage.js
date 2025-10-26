import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [dob, setDob] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // API Call to verify DOB for the logged-in-user (whose ID should be in a session/token)
    // fetch('/api/users/verify-dob', { method: 'POST', body: JSON.stringify({ dob }) })
    // .then(res => {
    //   if (res.ok) {
           navigate('/reset-password');
    //   } else {
    //     setMessage('Wrong information');
    //   }
    // })
    // .catch(err => setMessage('Server error'));

    // For testing
    if(dob) navigate('/reset-password');
  };

  return (
    <div className="bg1" style={{ minHeight: '100vh', paddingTop: '1px' }}>
      <br /><br /><br />
      <hr className="divider-line" />
      <h1 className="text-red center-text">Verify Your Date of Birth</h1>
      <hr className="divider-line" />
      <br /><br /><br /><br />
      <div className="form-container" style={{paddingTop: '5vh'}}>
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="date"
            placeholder="DATE OF BIRTH"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          /><br /><br /><br />
          <button className="form-button" type="submit">CHECK</button>
        </form>
        {message && <h2 className="form-message-error">{message}</h2>}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;