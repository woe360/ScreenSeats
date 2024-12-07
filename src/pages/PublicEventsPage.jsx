import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categories = ['all', 'movies', 'concerts', 'theater', 'sports'];
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events/public');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    if (!event || !event.eventType || !event.title || !event.venueName) return false;
    
    const matchesCategory = selectedCategory === 'all' || 
                          event.eventType.toLowerCase() === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.venueName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          Loading...
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <p className="text-red-500">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-gray-300 text-gray-900 placeholder-gray-500 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  selectedCategory === category 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sd:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <div 
              key={event._id} 
              className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer transition-all hover:border-gray-300 shadow-sm hover:shadow-md"
              onClick={() => navigate(`/events/${event._id}`)}
            >
              <div className="aspect-[3/4]">
                <img
                  src={event.posterUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                    ${Math.min(...event.seatSections.map(s => s.price))} - ${Math.max(...event.seatSections.map(s => s.price))}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  {new Date(event.date).toLocaleDateString()} • {event.time}
                </p>
                <p className="text-gray-600 mb-4">{event.venueName}</p>
                <button className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors">
                  Book Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;