import React from 'react';
import { Routes, Route } from 'react-router-dom';
// We will create these pages next
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import BrandPage from './pages/BrandPage';

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
      </Routes>
    </div>
  );
}
export default App;