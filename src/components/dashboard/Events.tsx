import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import EventModal from './EventModal';

const Events: React.FC = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || user.userType !== 'seller') {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/events/seller', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleAddEvent = async (eventData) => {
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(eventData),
      });
      const newEvent = await response.json();
      setEvents([...events, newEvent]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Events</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600/30 text-blue-700 rounded-md hover:bg-blue-700/40"
        >
          <Plus className="h-5 w-5" />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold text-lg mb-2">{event.title}</h3>
            <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-600">Time: {event.time}</p>
            <p className="text-gray-600">Venue: {event.venueName}</p>
            <p className="text-gray-600">Type: {event.eventType}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddEvent}
          event={editingEvent}
        />
      )}
    </div>
  );
};

export default Events; 