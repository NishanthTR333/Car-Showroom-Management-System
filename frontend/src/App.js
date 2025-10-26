import React from 'react';
import { Routes, Route } from 'react-router-dom';
// We will create these pages next
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import BrandPage from './pages/BrandPage';
import BookingPage from './pages/BookingPage';  
import BookingSuccessPage from './pages/BookingSuccessPage';




function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* These are the new routes you're adding */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/cars/:brandName" element={<BrandPage />} />
        <Route path="/book/:carName" element={<BookingPage />} />
        <Route path="/booking-success" element={<BookingSuccessPage />} />
      </Routes>
    </div>
  );
}
export default App;