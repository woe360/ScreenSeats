import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Edit, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// User Dashboard Component
const UserDashboard = () => {
  const [tickets] = useState([
    {
      id: 1,
      eventName: 'Concert XYZ',
      date: '2024-04-15',
      time: '19:00',
      venue: 'Arena Hall',
      ticketId: 'TIX123456'
    },
    // Add more tickets as needed
  ]);

  const downloadTicket = (ticketId) => {
    // Implement PDF download logic
    console.log(`Downloading ticket ${ticketId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">My Tickets</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white rounded-lg shadow-sm border border-slate-100 p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">{ticket.eventName}</h3>
              <p className="text-slate-600 mb-2">{ticket.date} • {ticket.time}</p>
              <p className="text-slate-600 mb-4">{ticket.venue}</p>
              <button
                onClick={() => downloadTicket(ticket.ticketId)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-600/30 text-orange-700 rounded hover:bg-orange-600/40"
              >
                <Download size={18} />
                Download Ticket
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};