import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenSeatsLogo from '../assets/ScreenSeats.svg';

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
            <p className="text-gray-600">Your ultimate destination for event tickets.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <button 
                  onClick={() => navigate('/')} 
                  className="hover:text-gray-800"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/project-info')} 
                  className="hover:text-gray-800"
                >
                  Project Information
                </button>
              </li>
            </ul>
          </div>
          
          <div className="col-span-2">
            <h4 className="font-semibold text-gray-800 mb-4">Contact Us</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
              <a href="mailto:matas.vanagas@knf.stud.vu.lt" className="hover:text-gray-800">
                matas.vanagas@knf.stud.vu.lt
              </a>
              <a href="mailto:jonas.andriuskevicius@knf.stud.vu.lt" className="hover:text-gray-800">
                jonas.andriuskevicius@knf.stud.vu.lt
              </a>
              <a href="mailto:karolis.vaiginis@knf.stud.vu.lt" className="hover:text-gray-800">
                karolis.vaiginis@knf.stud.vu.lt
              </a>
              <a href="mailto:lukas.malinauskas@knf.stud.vu.lt" className="hover:text-gray-800">
                lukas.malinauskas@knf.stud.vu.lt
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;