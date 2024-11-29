import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScreenSeatsLogo from '../assets/ScreenSeats.svg';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-cream-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div onClick={() => navigate('/')} className="flex items-center cursor-pointer">
            <img 
              src={ScreenSeatsLogo} 
              alt="ScreenSeats Logo" 
              className="h-8 w-auto"
            />
          </div>
          
          <div className="flex-1 flex justify-center px-8">
            <div className="max-w-lg w-full">
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-white rounded-lg pl-4 pr-10 py-2 border focus:outline-none focus:border-gray-500"
                  placeholder="Search events"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  <Search size={20} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/login')} 
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-black/80"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;