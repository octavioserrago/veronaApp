import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import AdminDashboard from './pages/admin/AdminDashboard';
import SellerDashboard from './pages/seller/SellerDashboard';



function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/sellerdashboard" element={<SellerDashboard />} />

          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;