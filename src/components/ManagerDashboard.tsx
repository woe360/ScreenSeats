import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, CalendarDays, LogOut } from 'lucide-react';
import logo from '../assets/ScreenSeats.svg';

const ManagerDashboard = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const menuItems = [
    { icon: BarChart3, label: 'Sales', path: '/manager-dashboard' },
    { icon: CalendarDays, label: 'Events', path: '/manager-dashboard/events' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <Link to="/">
              <img src={logo} alt="ScreenSeats" className="h-8" />
            </Link>
          </div>
          
          <nav className="flex-1 p-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-gray-950 text-gray-100'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;