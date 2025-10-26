import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css'; // Your global styles

// Import all the new page components
import SplashScreen from './pages/SplashScreen';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import BrandPage from './pages/BrandPage';
import BookingPage from './pages/BookingPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import RecoverIdPage from './pages/RecoverIdPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Splash screen from index.php */}
          <Route path="/" element={<SplashScreen />} /> 
          
          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/recover-id" element={<RecoverIdPage />} />

          {/* Main App Pages */}
          <Route path="/main" element={<MainPage />} />
          <Route path="/brand/:brandName" element={<BrandPage />} />
          <Route path="/book/:carName" element={<BookingPage />} />
          <Route path="/booking-success" element={<BookingSuccessPage />} />

          {/* Admin Pages */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

          {/* Default redirect to splash */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;