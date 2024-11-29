import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useNavigate } from 'react-router-dom';

const App = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-52">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            Book Your Entertainment
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Get the best seats for movies, shows, and events near you
          </p>
          <button 
      onClick={() => navigate('/events')} 
      className="px-8 py-3 bg-orange-600/30 text-orange-700 rounded-lg text-lg hover:bg-orange-600/40"
    >
      Browse Events
    </button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Easy Booking</h3>
            <p className="text-slate-600">Secure your tickets in minutes with our hassle-free booking system</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Best Seats</h3>
            <p className="text-slate-600">Choose from premium seats with our interactive seating layout</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Instant Tickets</h3>
            <p className="text-slate-600">Get your e-tickets delivered instantly to your email</p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Popular Events</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group relative bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
                <img
                  src={`/api/placeholder/300/450`}
                  alt="Event poster"
                  className="w-full h-full object-cover rounded-lg group-hover:opacity-90 transition"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white font-medium">Event Name</p>
                  <p className="text-slate-200 text-sm">From $29</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mt-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Coming Soon</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group relative bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
                <img
                  src={`/api/placeholder/300/450`}
                  alt="Event poster"
                  className="w-full h-full object-cover rounded-lg group-hover:opacity-90 transition"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white font-medium">Event Name</p>
                  <p className="text-slate-200 text-sm">Coming Soon</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;