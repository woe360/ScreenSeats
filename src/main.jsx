import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import EventsPage from './pages/PublicEventsPage.jsx';
import EventDetails from './pages/EventDetails';
import Login from './pages/login';
import Register from './pages/signup';
import ManagerDashboard from './components/ManagerDashboard';
import UserDashboard from './components/UserDashboard';
import Sales from './components/dashboard/Sales';
import Events from './components/dashboard/Events.tsx';  // Make sure the extension is included
import './index.css';
import ProjectInformation from './pages/ProjectInformation';


const ProtectedRoute = ({ element, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user || !localStorage.getItem('token')) {
    return <Navigate to="/login" replace />;
  }

  if (user.userType !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return element;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/project-info" element={<ProjectInformation />} />
        <Route path="/signup" element={<Register />} />
        <Route 
          path="/manager-dashboard" 
          element={
            <ProtectedRoute 
              element={
                <ManagerDashboard>
                  <Sales />
                </ManagerDashboard>
              } 
              allowedRole="seller" 
            />
          } 
        />
        <Route 
          path="/manager-dashboard/events" 
          element={
            <ProtectedRoute 
              element={
                <ManagerDashboard>
                  <Events />
                </ManagerDashboard>
              } 
              allowedRole="seller" 
            />
          } 
        />
        <Route 
          path="/user-dashboard" 
          element={<ProtectedRoute element={<UserDashboard />} allowedRole="buyer" />} 
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);