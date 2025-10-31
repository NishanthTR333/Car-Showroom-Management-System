import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import BrandPage from './pages/BrandPage';
import BookingPage from './pages/BookingPage';  
import BookingSuccessPage from './pages/BookingSuccessPage';


import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cars/:brandName" 
          element={
            <ProtectedRoute>
              <BrandPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/book/:carName" 
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/booking-success" 
          element={
            <ProtectedRoute>
              <BookingSuccessPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}
export default App;
