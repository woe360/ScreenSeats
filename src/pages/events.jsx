// import React, { useState } from 'react';
// import { Search } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const Events = () => {
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const categories = ['all', 'movies', 'concerts', 'theater', 'sports'];
  
//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Navbar />
//       <div className="py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row gap-4 mb-8">
//             <div className="relative flex-1">
//               <input
//                 type="text"
//                 placeholder="Search events..."
//                 className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
//               />
//               <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
//             </div>
//             <div className="flex gap-2">
//               {categories.map(category => (
//                 <button
//                   key={category}
//                   onClick={() => setSelectedCategory(category)}
//                   className={`px-4 py-2 rounded-lg capitalize ${
//                     selectedCategory === category 
//                       ? 'bg-orange-600/30 text-orange-700' 
//                       : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {Array.from({ length: 9 }).map((_, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
//                 <img
//                   src={`/api/placeholder/400/250`}
//                   alt="Event"
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-lg font-semibold text-slate-800">Event Name</h3>
//                     <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm">
//                       $29
//                     </span>
//                   </div>
//                   <p className="text-slate-600 text-sm mb-3">Thu, Apr 15 • 7:00 PM</p>
//                   <p className="text-slate-600 mb-4">Venue Name • City, State</p>
//                   <button className="w-full px-4 py-2 bg-orange-600/30 text-orange-700 rounded hover:bg-orange-600/40">
//                     Book Tickets
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <button className="px-8 py-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
//               Load More Events
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Events;

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const categories = ['all', 'movies', 'concerts', 'theater', 'sports'];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
            </div>
            <div className="flex gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    selectedCategory === category 
                      ? 'bg-orange-600/30 text-orange-700' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => {
              const event = {
                id: index,
                name: "Event Name",
                price: "$29",
                date: "Thu, Apr 15 • 7:00 PM",
                venue: "Venue Name • City, State",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                image: `/api/placeholder/400/250`
              };
              
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden cursor-pointer transition hover:shadow-md"
                  onClick={() => handleEventClick(event)}
                >
                  <img
                    src={event.image}
                    alt="Event"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-slate-800">{event.name}</h3>
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm">
                        {event.price}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{event.date}</p>
                    <p className="text-slate-600 mb-4">{event.venue}</p>
                    <button className="w-full px-4 py-2 bg-orange-600/30 text-orange-700 rounded hover:bg-orange-600/40">
                      Book Tickets
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedEvent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative">
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 z-10"
                  >
                    <X size={24} />
                  </button>
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.name}
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-slate-800">{selectedEvent.name}</h2>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-lg">
                      {selectedEvent.price}
                    </span>
                  </div>
                  <p className="text-slate-600 text-lg mb-3">{selectedEvent.date}</p>
                  <p className="text-slate-600 text-lg mb-6">{selectedEvent.venue}</p>
                  <p className="text-slate-700 mb-6">{selectedEvent.description}</p>
                  <button className="w-full px-6 py-3 bg-orange-600/30 text-orange-700 rounded-lg text-lg font-medium hover:bg-orange-600/40">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <button className="px-8 py-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
              Load More Events
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;