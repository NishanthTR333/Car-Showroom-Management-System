import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AdminDashboardPage() {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    brand: 'BMW',
    price: '',
    fuel: 'Petrol',
    avc: '',
    fimg: '', // This will just be the file name
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      // In a real app, you'd upload this file and get a URL.
      // For this app, we just store the file name as per addcar.php
      setFormData(prev => ({ ...prev, fimg: e.target.files[0].name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API Call:
    // fetch('/api/admin/add-car', { method: 'POST', body: JSON.stringify(formData) })
    // .then(res => {
    //   if (res.ok) {
    //     setMessage('Car added successfully!');
    //     setFormData({ name: '', brand: 'BMW', price: '', fuel: 'Petrol', avc: '', fimg: '' });
    //   } else {
    //     setMessage('Failed to add car.');
    //   }
    // })
    // .catch(err => setMessage('Server Error'));

    // For testing:
    setMessage(`Car "${formData.name}" added successfully!`);
  };

  return (
    <div className="admin-page bg1" style={{ minHeight: '100vh', paddingTop: '1px' }}>
      <nav className="navbar">
        <Link className="navbar__link" to="/main">Home</Link>
        <Link className="navbar__link" to="/admin/dashboard">Add Car</Link>
        <Link className="navbar__link" to="/listings">Listings</Link>
        <Link className="navbar__link" to="/contact">Contact Us</Link>
      </nav>

      <br /><br /><br /><br /><br /><br />
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif", color: 'white' }}>
            Add Cars to Showroom
          </h1>
          <input
            className="form-input"
            type="text"
            placeholder="Name of Car"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          /><br /><br /><br />

          <select className="form-select" name="brand" value={formData.brand} onChange={handleChange} required>
            <option value="BMW">BMW</option>
            <option value="AUDI">AUDI</option>
            <option value="RR">ROLLS ROYCE</option>
            <option value="BENZ">BENZ</option>
            <option value="PORSCHE">PORSCHE</option>
            <option value="JAGUAR">JAGUAR</option>
            <option value="LAMBORGHINI">LAMBORGHINI</option>
            <option value="FERRARI">FERRARI</option>
          </select><br /><br /><br />

          <input
            className="form-input"
            type="text"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          /><br /><br /><br />

          <select className="form-select" name="fuel" value={formData.fuel} onChange={handleChange} required>
            <option value="Petrol">PETROL</option>
            <option value_="Diesel">DIESEL</option>
          </select><br /><br /><br />

          <input
            className="form-input"
            type="text"
            name="avc"
            placeholder="Number of Cars"
            value={formData.avc}
            onChange={handleChange}
            required
          /><br /><br /><br />

          <h3 htmlFor="file" style={{ fontFamily: "'Times New Roman', Times, serif", marginLeft:'5%', color: 'white' }}>
            Choose an image:
          </h3>
          {/* File handling is complex. This just gets the name. */}
          <input
            className="form-select" // Re-using style
            type="file"
            name="fimg"
            onChange={handleFileChange}
            required
          /><br /><br /><br />

          <center><button className="form-button" type="submit">ADD CAR</button></center>
        </form>
        {message && <h2 className="form-message-success center-text">{message}</h2>}
      </div>
    </div>
  );
}

export default AdminDashboardPage;