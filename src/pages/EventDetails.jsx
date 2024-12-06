import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeatingPlan from '../components/SeatingPlan';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError('Event not found');
          navigate('/events'); // Redirect to events page if event doesn't exist
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data) {
        throw new Error('Event not found');
      }
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event details:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSeatSelect = (seat) => {
    setSelectedSeat(seat);
  };

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
  
    if (!user || !token) {
      navigate('/login');
      return;
    }
  
    if (user.userType !== 'buyer') {
      alert('Only buyers can book tickets');
      return;
    }
  
    if (!selectedSeat) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: event._id,
          seatNumber: selectedSeat.number,
          sectionType: selectedSeat.section,
          price: selectedSeat.price
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to book ticket');
      }
  
      const booking = await response.json();
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Error booking seat:', error);
      alert('Failed to book ticket. Please try again.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/events')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Events
        </button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-slate-600">Event not found</p>
          <button
            onClick={() => navigate('/events')}
            className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-700"
          >
            Back to Events
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/events')}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Events
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={event.posterUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
              <p className="text-xl opacity-90">
                {new Date(event.date).toLocaleDateString()} • {event.time}
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-gray-600 whitespace-pre-wrap mb-6">
                  {event.description}
                </p>

                <h2 className="text-2xl font-bold mb-4">Venue Information</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-lg">{event.venueName}</p>
                  <p className="text-gray-600">Venue Size: {event.venueSize}</p>
                  <p className="text-gray-600">Total Capacity: {event.capacity} seats</p>
                </div>

                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">Select Your Seat</h2>
                  <SeatingPlan event={event} onSeatSelect={handleSeatSelect} />
                </div>
              </div>

              <div>
                <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
                  <h3 className="text-xl font-bold mb-4">Ticket Information</h3>
                  <div className="space-y-4">
                    {event.seatSections.map((section) => (
                      <div key={section.type} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{section.type}</p>
                          <p className="text-sm text-gray-500">
                            {section.capacity} seats available
                          </p>
                        </div>
                        <p className="font-bold">${section.price}</p>
                      </div>
                    ))}
                  </div>
                  
                  {selectedSeat ? (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Selected Seat:</h4>
                      <p>Section: {selectedSeat.section}</p>
                      <p>Seat Number: {selectedSeat.number}</p>
                      <p className="font-bold mt-2">Price: ${selectedSeat.price}</p>
                      <button
                        onClick={handleBooking}
                        className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  ) : (
                    <p className="mt-6 text-center text-gray-500">
                      Please select a seat to continue
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetails; 