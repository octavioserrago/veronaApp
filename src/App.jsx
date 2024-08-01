import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import AdminDashboard from './pages/admin/AdminDashboard';
import SellerDashboard from './pages/seller/SellerDashboard';
import OperativeDashboard from './pages/operative/OperativeDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import UsersCrud from './pages/admin/UsersCrud';
import NewSale from './pages/NewSale';
import MoneyEntries from "./pages/MoneyEntries";
import VerificarIngresosCredito from "./pages/CreditVerifications"

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/sellerdashboard" element={<SellerDashboard />} />
            <Route path="/operativedashboard" element={<OperativeDashboard />} />
            <Route path="/managerdashboard" element={<ManagerDashboard />} />
            <Route path="/UsersCrud" element={<UsersCrud />} />
            <Route path="/NewSale" element={<NewSale />} />
            <Route path="/IngresarDinero" element={<MoneyEntries />} />
            <Route path="/VerificarIngresosCredito" element={<VerificarIngresosCredito />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
