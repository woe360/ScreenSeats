import React from 'react';
import ScreenSeatsLogo from '../assets/ScreenSeats.svg';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

    const navigate = useNavigate();

  return (
    <footer className="bg-cream-100 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
          <div onClick={() => navigate('/')} className="flex items-center cursor-pointer">
            <img 
              src={ScreenSeatsLogo} 
              alt="ScreenSeats Logo" 
              className="h-8 w-auto"
            />
          </div>
            <p className="text-gray-600">Your ultimate destination for movies and TV shows.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-gray-800">Home</a></li>
              <li><a href="#" className="hover:text-gray-800">Movies</a></li>
              <li><a href="#" className="hover:text-gray-800">TV Shows</a></li>
              <li><a href="#" className="hover:text-gray-800">New Releases</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-gray-800">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-800">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-800">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-gray-800">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-800">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-800">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">© 2024 ScreenSeats. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;