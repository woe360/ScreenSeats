import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';
import heroImage from './assets/hero-image.png';
import ProjectInformation from './pages/ProjectInformation';

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events/public');
      const data = await response.json();
      setEvents(data.slice(0, 8)); // Get first 8 events for display
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
      <section className="flex items-center justify-between mb-24">
        <div className="flex-1 pr-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 text-left">
            Your Gateway to Live Entertainment
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-left max-w-xl">
            Book tickets for the most exciting events in your city. Experience unforgettable moments with premium seats and instant booking.
          </p>
          <Link
            to="/events"
            className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Explore Events
          </Link>
        </div>
        
        <div className="flex-1">
          <img 
            src={heroImage}
            alt="Live Entertainment"
            className="w-full aspect-square object-cover rounded-2xl"
          />
        </div>
      </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              title: "Easy Booking",
              desc: "Secure your tickets in minutes with our hassle-free booking system"
            },
            {
              title: "Best Seats",
              desc: "Choose from premium seats with our interactive seating layout"
            },
            {
              title: "Instant Tickets",
              desc: "Get your e-tickets delivered instantly to your email"
            }
          ].map((item, index) => (
            <div key={index} className="p-8 bg-white rounded-xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </section>
        <section className="mb-24">
  {events.length > 0 && (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 shadow-sm hover:shadow-md transition-all">
      <Link to={`/events/${events.reduce((prev, current) => {
        const prevMaxPrice = Math.max(...prev.seatSections.map(s => s.price));
        const currentMaxPrice = Math.max(...current.seatSections.map(s => s.price));
        return prevMaxPrice > currentMaxPrice ? prev : current;
      })._id}`} className="flex">
<div className="w-1/3">
  <div className="aspect-[3/4] relative">
    <img
      src={events.reduce((prev, current) => {
        const prevMaxPrice = Math.max(...prev.seatSections.map(s => s.price));
        const currentMaxPrice = Math.max(...current.seatSections.map(s => s.price));
        return prevMaxPrice > currentMaxPrice ? prev : current;
      }).posterUrl}
      alt="Featured Event"
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>
</div>
        <div className="w-2/3 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Event</h2>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            {events.reduce((prev, current) => {
              const prevMaxPrice = Math.max(...prev.seatSections.map(s => s.price));
              const currentMaxPrice = Math.max(...current.seatSections.map(s => s.price));
              return prevMaxPrice > currentMaxPrice ? prev : current;
            }).title}
          </h3>
          <p className="text-gray-600 mb-6">
            {events.reduce((prev, current) => {
              const prevMaxPrice = Math.max(...prev.seatSections.map(s => s.price));
              const currentMaxPrice = Math.max(...current.seatSections.map(s => s.price));
              return prevMaxPrice > currentMaxPrice ? prev : current;
            }).venueName}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">
              Starts from ${Math.min(...events.reduce((prev, current) => {
                const prevMaxPrice = Math.max(...prev.seatSections.map(s => s.price));
                const currentMaxPrice = Math.max(...current.seatSections.map(s => s.price));
                return prevMaxPrice > currentMaxPrice ? prev : current;
              }).seatSections.map(s => s.price))}
            </p>
            <span className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </div>
  )}
</section>
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Events</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {events.map((event) => (
              <Link to={`/events/${event._id}`} key={event._id} className="group cursor-pointer">
                <div className="aspect-[3/4] relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <img
                    src={event.posterUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <p className="text-white font-medium text-lg mb-1">{event.title}</p>
                    <p className="text-gray-200 text-sm">
                      ${Math.min(...event.seatSections.map(s => s.price))} - ${Math.max(...event.seatSections.map(s => s.price))}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;