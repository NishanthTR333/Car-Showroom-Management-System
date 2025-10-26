import React from 'react';
import { Routes, Route } from 'react-router-dom';
// We will create these pages next
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import HomePage from './pages/HomePage'; // For later

function App() {
  return (
    <div>
      <Routes>
        {/* We'll make the login page the default for now */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/home" element={<HomePage />} /> */}
      </Routes>
    </div>
  );
}
export default App;