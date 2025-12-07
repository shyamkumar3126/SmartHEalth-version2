import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { 
  DashboardView, 
  DoctorsView, 
  PharmacyView, 
  LabsView, 
  RecordsView, 
  CartView, 
  AppointmentsView, 
  ClinicFinderView, 
  OnlineConsultView, 
  ProfileView,
  LoginView
} from './components/Views';
import { CartItem } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-10 right-10 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm z-50 animate-in fade-in slide-in-from-bottom-5 font-medium shadow-lg';
    notification.innerText = `Added ${item.name} to cart`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <HashRouter>
      <Layout cartCount={cart.length} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/doctors" element={<DoctorsView />} />
          <Route path="/pharmacy" element={<PharmacyView onAddToCart={addToCart} />} />
          <Route path="/labs" element={<LabsView onAddToCart={addToCart} />} />
          <Route path="/records" element={<RecordsView />} />
          <Route path="/appointments" element={<AppointmentsView />} />
          <Route path="/clinics" element={<ClinicFinderView />} />
          <Route path="/consult" element={<OnlineConsultView />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/cart" element={<CartView cart={cart} onRemove={removeFromCart} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;