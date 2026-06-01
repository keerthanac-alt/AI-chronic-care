import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import OCRAnalyzer from './components/OCRAnalyzer';
import Appointments from './pages/Appointments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/ocr" element={<OCRAnalyzer />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
