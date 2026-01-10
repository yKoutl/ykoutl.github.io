import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioScreen from './screens/PortfolioScreen';
import LoginScreen from './screens/LoginScreen';
import AdminScreen from './screens/AdminScreen';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
      </Routes>
    </Router>
  );
}
