import React, { useState } from 'react';

function RecoverIdPage() {
  const [mode, setMode] = useState('select'); // 'select', 'phone', 'mail'
  const [message, setMessage] = useState('');
  const [value, setValue] = useState('');
  const [userId, setUserId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserId(null); // Clear previous result
    
    // const payload = { mode, value };
    // API Call:
    // fetch('/api/users/recover-id', { method: 'POST', body: JSON.stringify(payload) })
    // .then(res => res.json())
    // .then(data => {
    //   if (data.success) {
    //     setUserId(data.id);
    //     setMessage('');
    //   } else {
    //     setMessage(data.message || 'Not found');
    //   }
    // })
    // .catch(err => setMessage('Server error'));

    // For testing:
    if (value.length > 3) {
      setUserId('testUser123');
      setMessage('');
    } else {
      setMessage(mode === 'phone' ? 'Mobile Number Not Registered' : 'Mail ID Not Registered');
    }
  };

  if (mode === 'select') {
    return (
      <div className="bg1" style={{ minHeight: '100vh', paddingTop: '30vh', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', width: '30%', marginLeft: '25%' }}>
          <button className="form-button" style={{ width: '100%' }} onClick={() => setMode('phone')}>
            <img src="/images/pho.png" alt="Phone" style={{ height: '100px', verticalAlign: 'middle' }} />
            USING PHONE NUMBER
          </button>
        </div>
        <div style={{ display: 'inline-block', width: '30%', marginLeft: '5%' }}>
          <button className="form-button" style={{ width: '100%' }} onClick={() => setMode('mail')}>
            <img src="/images/mail.png" alt="Mail" style={{ height: '100px', verticalAlign: 'middle' }} />
            USING MAIL ID
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg1" style={{ minHeight: '100vh' }}>
      <div className="form-container" style={{ paddingTop: '20vh' }}>
        <button onClick={() => setMode('select')} className="form-button" style={{float: 'left'}}>Back</button>
        <br /><br />
        <h1 className="text-red">
          Recover Using {mode === 'phone' ? 'Mobile Number' : 'Mail ID'}
        </h1><br /><br /><br />
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type={mode === 'phone' ? 'tel' : 'email'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={mode === 'phone' ? 'Mobile Number' : 'Mail ID'}
          />
          <br /><br /><br />
          <button className="form-button" type="submit">Recover ID</button>
        </form>
        <br /><br />
        {message && <h2 className="form-message-error">{message}</h2>}
        {userId && <h2 className="form-message-success">Your ID: {userId}</h2>}
      </div>
    </div>
  );
}

export default RecoverIdPage;