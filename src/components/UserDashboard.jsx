'use client';
import React, { useEffect, useState } from 'react';
import { Download, LogOut } from 'lucide-react';
import jsPDF from 'jspdf';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/ScreenSeats.svg';
import Navbar from './Navbar';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [logoDataUrl, setLogoDataUrl] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.userType !== 'buyer') {
      navigate('/login');
      return;
    }
    fetchBookings();
    convertLogoToDataUrl();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const convertLogoToDataUrl = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      setLogoDataUrl(canvas.toDataURL('image/png'));
    };
    img.src = logo;
  };

  const handleDownload = (booking) => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [210, 100]
    });

    if (logoDataUrl) {
      const logoWidth = 30;
      const logoX = (210 - logoWidth) / 2;
      doc.addImage(logoDataUrl, 'PNG', logoX, 10, logoWidth, 15);
    }

    // Add ticket details
    doc.setFontSize(24);
    doc.setTextColor(0, 102, 204);
    doc.text(booking.eventId.title, 105, 40, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51);
    
    // Ticket information
    doc.text('Date:', 20, 55);
    doc.text(new Date(booking.eventId.date).toLocaleDateString(), 45, 55);
    
    doc.text('Venue:', 20, 65);
    doc.text(booking.eventId.venueName, 45, 65);
    
    doc.text('Section:', 130, 55);
    doc.text(booking.sectionType, 155, 55);
    
    doc.text('Seat:', 130, 65);
    doc.text(`${booking.seatNumber}`, 155, 65);
    
    doc.text('Price:', 130, 75);
    doc.text(`$${booking.price}`, 155, 75);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Powered by ScreenSeats', 105, 90, { align: 'center' });

    doc.save(`ticket-${booking.eventId.title}-${booking.seatNumber}.pdf`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        {bookings.filter(booking => booking.eventId).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tickets found</p>
            <Link to="/events" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
              Browse events
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(booking => {
              if (!booking.eventId) return null;

              return (
                <div key={booking._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:border-gray-300 transition-all">
                  <div className="flex">
                    <div className="w-48 h-48">
                      <img
                        src={booking.eventId.posterUrl}
                        alt={booking.eventId.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.eventId.title}</h3>
                          <p className="text-gray-600">{new Date(booking.eventId.date).toLocaleDateString()} • {booking.eventId.time}</p>
                          <p className="text-gray-600 mt-1">{booking.eventId.venueName}</p>
                          <div className="mt-4 space-y-1">
                            <p className="text-gray-600">Section: {booking.sectionType}</p>
                            <p className="text-gray-600">Seat: {booking.seatNumber}</p>
                            <p className="text-gray-600">Price: ${booking.price}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDownload(booking)}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          Download Ticket
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-4">
                        Booked on: {new Date(booking.bookingDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;