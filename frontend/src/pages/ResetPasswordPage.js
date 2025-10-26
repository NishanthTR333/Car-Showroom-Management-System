import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Password Missmatch');
      return;
    }

    // API Call: Reset the password
    // fetch('/api/users/reset-password', { method: 'POST', body: JSON.stringify({ newPassword }) })
    // .then(res => {
    //   if (res.ok) {
           navigate('/login'); // Go to login
    //   } else {
    //     setMessage("Couldn't Change Password");
    //   }
    // })
    // .catch(err => setMessage('Server error'));
    
    // For testing
    navigate('/login');
  };

  return (
    <div className="bg1" style={{ minHeight: '100vh' }}>
      <div className="form-container" style={{ paddingTop: '20vh' }}>
        <form onSubmit={handleSubmit}>
          <h1 className="text-red">Change Password</h1>
          <br /><br /><br /><br />
          <input
            className="form-input"
            type="password"
            placeholder="NEW PASSWORD"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          /><br /><br /><br />
          <input
            type="password"
            className="form-input"
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          /><br /><br /><br />
          <button className="form-button" type="submit">CHANGE</button><br />
        </form>
        {message && <h2 className="form-message-error">{message}</h2>}
      </div>
    </div>
  );
}

export default ResetPasswordPage;