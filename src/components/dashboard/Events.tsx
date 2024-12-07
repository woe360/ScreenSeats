import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
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

  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (eventData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${editingEvent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(eventData),
      });
      const updatedEvent = await response.json();
      setEvents(events.map((event) => event._id === updatedEvent._id ? updatedEvent : event));
      setEditingEvent(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete event: ${response.status}`);
      }
  
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Events</h2>
        <button
          onClick={() => {
            setEditingEvent(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600/30 text-blue-700 rounded-md hover:bg-blue-700/40"
        >
          <Plus className="h-5 w-5" />
          Add Event
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div 
            key={event._id} 
            className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img 
                src={event.posterUrl} 
                alt={event.title}
                className="h-16 w-16 object-cover rounded"
              />
              <div>
                <h3 className="font-bold text-lg">{event.title}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Time: {event.time}</p>
                  <p>Venue: {event.venueName} ({event.venueSize})</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(event)}
                className="p-2 hover:bg-gray-100 rounded-full text-blue-600"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="p-2 hover:bg-gray-100 rounded-full text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEvent(null);
          }}
          onSubmit={editingEvent ? handleEditSubmit : handleAddEvent}
          event={editingEvent}
        />
      )}
    </div>
  );
};

export default Events; 