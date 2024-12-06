'use client';
import React, { useEffect, useState } from 'react';
import { Download, LogOut } from 'lucide-react';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ScreenSeats.svg';

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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tickets</h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600/40 text-red-500 rounded-md hover:bg-red-700/40 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookings.map(booking => (
          <div key={booking._id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{booking.eventId.title}</h3>
              <button 
                onClick={() => handleDownload(booking)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Download className="h-5 w-5 text-blue-600" />
              </button>
            </div>
            <p className="text-gray-600">Date: {new Date(booking.eventId.date).toLocaleDateString()}</p>
            <p className="text-gray-600">Venue: {booking.eventId.venueName}</p>
            <p className="text-gray-600">Section: {booking.sectionType}</p>
            <p className="text-gray-600">Seat: {booking.seatNumber}</p>
            <p className="text-gray-600">Price: ${booking.price}</p>
            <p className="text-sm text-gray-500 mt-2">Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;