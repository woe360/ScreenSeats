// import React from 'react';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import { useNavigate } from 'react-router-dom';

// const App = () => {

//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen font-sans bg-slate-50">
//       <Navbar />
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-52">
//         <section className="text-center mb-16">
//           <h1 className="text-5xl font-bold text-slate-800 mb-4">
//             Book Your Entertainment
//           </h1>
//           <p className="text-xl text-slate-600 mb-8">
//             Get the best seats for movies, shows, and events near you
//           </p>
//           <button 
//             onClick={() => navigate('/events')} 
//             className="px-8 py-3 bg-blue-900/30 text-blue-800/80 rounded-lg text-lg hover:bg-blue-600/40"
//           >
//             Browse Events
//           </button>
//         </section>

//         <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
//           <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-100">
//             <h3 className="text-xl font-semibold text-slate-800 mb-3">Easy Booking</h3>
//             <p className="text-slate-600">Secure your tickets in minutes with our hassle-free booking system</p>
//           </div>
//           <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-100">
//             <h3 className="text-xl font-semibold text-slate-800 mb-3">Best Seats</h3>
//             <p className="text-slate-600">Choose from premium seats with our interactive seating layout</p>
//           </div>
//           <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-100">
//             <h3 className="text-xl font-semibold text-slate-800 mb-3">Instant Tickets</h3>
//             <p className="text-slate-600">Get your e-tickets delivered instantly to your email</p>
//           </div>
//         </section>

//         <section className="text-center">
//           <h2 className="text-3xl font-bold text-slate-800 mb-8">Popular Events</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((item) => (
//               <div key={item} className="group relative bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
//                 <img
//                   src={`/api/placeholder/300/450`}
//                   alt="Event poster"
//                   className="w-full h-full object-cover rounded-lg group-hover:opacity-90 transition"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//                   <p className="text-white font-medium">Event Name</p>
//                   <p className="text-slate-200 text-sm">From $29</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="text-center mt-24">
//           <h2 className="text-3xl font-bold text-slate-800 mb-8">Coming Soon</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((item) => (
//               <div key={item} className="group relative bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
//                 <img
//                   src={`/api/placeholder/300/450`}
//                   alt="Event poster"
//                   className="w-full h-full object-cover rounded-lg group-hover:opacity-90 transition"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//                   <p className="text-white font-medium">Event Name</p>
//                   <p className="text-slate-200 text-sm">Coming Soon</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default App;

import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const dummyEvents = [
    { name: "Summer Music Festival", price: "From $59" },
    { name: "Hamilton - Live", price: "From $129" },
    { name: "Comedy Night Special", price: "From $39" },
    { name: "The Lion King Musical", price: "From $89" }
  ];

  const upcomingEvents = [
    { name: "Rock Concert 2025", date: "Mar 15" },
    { name: "Ballet Performance", date: "Apr 2" },
    { name: "Stand-up Comedy Show", date: "Apr 10" },
    { name: "Opera Night", date: "Apr 25" }
  ];

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-stone-100 to-stone-200">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-52">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-stone-700 mb-4">
            Book Your Entertainment
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get the best seats for movies, shows, and events near you
          </p>
          <button 
            onClick={() => navigate('/events')} 
            className="px-8 py-3 bg-white text-black rounded-lg text-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Browse Events
          </button>
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
            <div key={index} className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-indigo-100 hover:border-indigo-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Events</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {dummyEvents.map((event, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[2/3] relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-indigo-100 overflow-hidden">
                  <img
                    src={`/api/placeholder/600/900`}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <p className="text-white font-medium text-lg mb-1">{event.name}</p>
                    <p className="text-indigo-200 text-sm">{event.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Coming Soon</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[2/3] relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-indigo-100 overflow-hidden">
                  <img
                    src={`/api/placeholder/600/900`}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <p className="text-white font-medium text-lg mb-1">{event.name}</p>
                    <p className="text-indigo-200 text-sm">{event.date}</p>
                  </div>
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