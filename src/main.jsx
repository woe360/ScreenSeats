import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Events from './pages/Events';
import Login from './pages/Login';
import Signup from './pages/signup';
import ManagerDashboard from './components/ManagerDashboard';
import UserDashboard from './components/UserDashboard';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
  <Route path="/" element={<App />} />
  <Route path="/events" element={<Events />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/manager-dashboard" element={<ManagerDashboard />} />
  <Route path="/user-dashboard" element={<UserDashboard />} />
</Routes>
    </BrowserRouter>
  </React.StrictMode>
);