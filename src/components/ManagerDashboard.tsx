import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Edit, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const ManagerDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('events');
    const [events] = useState([
      {
        id: 1,
        name: 'Concert ABC',
        date: '2024-05-20',
        venue: 'Main Stadium',
        capacity: 1000,
        soldTickets: 750,
        revenue: 15000
      },
      // Add more events as needed
    ]);
  
    const revenueData = [
      { name: 'Jan', revenue: 12000 },
      { name: 'Feb', revenue: 15000 },
      { name: 'Mar', revenue: 18000 },
      // Add more monthly data
    ];
  
    const handleDelete = (eventId) => {
      // Implement delete logic
      console.log(`Deleting event ${eventId}`);
    };
  
    const handleEdit = (eventId) => {
      // Implement edit logic
      console.log(`Editing event ${eventId}`);
    };
  
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Event Manager Dashboard</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('events')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'events'
                    ? 'bg-orange-600/30 text-orange-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                My Events
              </button>
              <button
                onClick={() => setActiveTab('sales')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'sales'
                    ? 'bg-orange-600/30 text-orange-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Sales Dashboard
              </button>
            </div>
          </div>
  
          {activeTab === 'events' && (
            <div>
              <div className="h-80 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow-sm border border-slate-100 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-slate-800">{event.name}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(event.id)}
                          className="p-2 text-slate-600 hover:text-orange-600"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 text-slate-600 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-2">{event.date}</p>
                    <p className="text-slate-600 mb-4">{event.venue}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Sold: {event.soldTickets}/{event.capacity}</span>
                      <span className="text-orange-700">${event.revenue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
  
          {activeTab === 'sales' && (
            <div>
              <div className="h-80 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
  
              <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Event</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Venue</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">Sold</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">Capacity</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {events.map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 text-sm text-slate-800">{event.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{event.date}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{event.venue}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 text-right">{event.soldTickets}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 text-right">{event.capacity}</td>
                        <td className="px-6 py-4 text-sm text-orange-700 text-right">${event.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  };
  
  export { UserDashboard, ManagerDashboard };