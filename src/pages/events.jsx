// import React, { useState } from 'react';
// import { Search, X } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const EventsPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const categories = ['all', 'movies', 'concerts', 'theater', 'sports'];

//   const handleEventClick = (event) => {
//     setSelectedEvent(event);
//   };
  
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
//             {Array.from({ length: 9 }).map((_, index) => {
//               const event = {
//                 id: index,
//                 name: "Event Name",
//                 price: "$29",
//                 date: "Thu, Apr 15 • 7:00 PM",
//                 venue: "Venue Name • City, State",
//                 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//                 image: `/api/placeholder/400/250`
//               };
              
//               return (
//                 <div 
//                   key={index} 
//                   className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden cursor-pointer transition hover:shadow-md"
//                   onClick={() => handleEventClick(event)}
//                 >
//                   <img
//                     src={event.image}
//                     alt="Event"
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <h3 className="text-lg font-semibold text-slate-800">{event.name}</h3>
//                       <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm">
//                         {event.price}
//                       </span>
//                     </div>
//                     <p className="text-slate-600 text-sm mb-3">{event.date}</p>
//                     <p className="text-slate-600 mb-4">{event.venue}</p>
//                     <button className="w-full px-4 py-2 bg-orange-600/30 text-orange-700 rounded hover:bg-orange-600/40">
//                       Book Tickets
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {selectedEvent && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//               <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//                 <div className="relative">
//                   <button 
//                     onClick={() => setSelectedEvent(null)}
//                     className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 z-10"
//                   >
//                     <X size={24} />
//                   </button>
//                   <img
//                     src={selectedEvent.image}
//                     alt={selectedEvent.name}
//                     className="w-full h-80 object-cover"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <h2 className="text-2xl font-bold text-slate-800">{selectedEvent.name}</h2>
//                     <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-lg">
//                       {selectedEvent.price}
//                     </span>
//                   </div>
//                   <p className="text-slate-600 text-lg mb-3">{selectedEvent.date}</p>
//                   <p className="text-slate-600 text-lg mb-6">{selectedEvent.venue}</p>
//                   <p className="text-slate-700 mb-6">{selectedEvent.description}</p>
//                   <button className="w-full px-6 py-3 bg-orange-600/30 text-orange-700 rounded-lg text-lg font-medium hover:bg-orange-600/40">
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

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

// export default EventsPage;




// import React, { useState } from 'react';
// import { Search, X } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const events = [
//   {
//     id: 1,
//     name: "Avengers: Final Chapter",
//     price: "$29",
//     date: "Thu, Apr 15 • 7:00 PM",
//     venue: "AMC Theater • New York, NY",
//     category: "movies",
//     description: "Experience the epic conclusion of the Marvel saga in IMAX.",
//     image: `/api/placeholder/400/250`
//   },
//   {
//     id: 2,
//     name: "Taylor Swift Concert",
//     price: "$199",
//     date: "Fri, Apr 16 • 8:00 PM",
//     venue: "Madison Square Garden • New York, NY",
//     category: "concerts",
//     description: "The Eras Tour comes to New York City!",
//     image: `/api/placeholder/400/250`
//   },
//   {
//     id: 3,
//     name: "Hamilton",
//     price: "$149",
//     date: "Sat, Apr 17 • 2:00 PM",
//     venue: "Richard Rodgers Theatre • New York, NY",
//     category: "theater",
//     description: "Don't miss the Tony Award-winning musical phenomenon.",
//     image: `/api/placeholder/400/250`
//   },
//   {
//     id: 4,
//     name: "NBA Finals Game 1",
//     price: "$299",
//     date: "Sun, Apr 18 • 8:30 PM",
//     venue: "Barclays Center • Brooklyn, NY",
//     category: "sports",
//     description: "Witness the battle for basketball supremacy.",
//     image: `/api/placeholder/400/250`
//   },
//   {
//     id: 5,
//     name: "Inception IMAX Re-release",
//     price: "$24",
//     date: "Mon, Apr 19 • 7:30 PM",
//     venue: "IMAX Theater • Los Angeles, CA",
//     category: "movies",
//     description: "Christopher Nolan's masterpiece returns to IMAX screens.",
//     image: `/api/placeholder/400/250`
//   },
//   {
//     id: 6,
//     name: "Ed Sheeran World Tour",
//     price: "$159",
//     date: "Tue, Apr 20 • 7:00 PM",
//     venue: "SoFi Stadium • Los Angeles, CA",
//     category: "concerts",
//     description: "Global superstar's biggest tour yet.",
//     image: `/api/placeholder/400/250`
//   },
//   {
//     id: 7,
//     name: "The Lion King",
//     price: "$129",
//     date: "Wed, Apr 21 • 7:30 PM",
//     venue: "Minskoff Theatre • New York, NY",
//     category: "theater",
//     description: "Disney's award-winning musical spectacular.",
//     image: `/api/placeholder/400/250`
//   },
//   {
//     id: 8,
//     name: "UFC 300",
//     price: "$499",
//     date: "Sat, Apr 24 • 10:00 PM",
//     venue: "T-Mobile Arena • Las Vegas, NV",
//     category: "sports",
//     description: "Historic night of mixed martial arts action.",
//     image: `/api/placeholder/400/250`
//   },
//   {
//     id: 9,
//     name: "Coldplay Concert",
//     price: "$179",
//     date: "Sun, Apr 25 • 8:00 PM",
//     venue: "MetLife Stadium • East Rutherford, NJ",
//     category: "concerts",
//     description: "Music of the Spheres World Tour.",
//     image: `/api/placeholder/400/250`
//   },
//   {
//     id: 10,
//     name: "Wicked",
//     price: "$139",
//     date: "Mon, Apr 26 • 7:00 PM",
//     venue: "Gershwin Theatre • New York, NY",
//     category: "theater",
//     description: "The untold story of the witches of Oz.",
//     image: `/api/placeholder/400/250`
//   },
//   {
//     id: 11,
//     name: "Formula 1 Miami GP",
//     price: "$399",
//     date: "Sun, May 2 • 3:30 PM",
//     venue: "Miami International Autodrome • Miami, FL",
//     category: "sports",
//     description: "High-speed racing action in the heart of Miami.",
//     image: `/api/placeholder/400/250`
//   },
//   {
//     id: 12,
//     name: "Oppenheimer",
//     price: "$24",
//     date: "Thu, May 6 • 7:00 PM",
//     venue: "TCL Chinese Theatre • Los Angeles, CA",
//     category: "movies",
//     description: "Christopher Nolan's epic biographical thriller.",
//     image: `/api/placeholder/400/250`
//   }
// ];

// const EventsPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const categories = ['all', 'movies', 'concerts', 'theater', 'sports'];

//   const filteredEvents = events.filter(event => {
//     const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
//     const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          event.venue.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const handleEventClick = (event) => {
//     setSelectedEvent(event);
//   };
  
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
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
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
//             {filteredEvents.map((event) => (
//               <div 
//                 key={event.id} 
//                 className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden cursor-pointer transition hover:shadow-md"
//                 onClick={() => handleEventClick(event)}
//               >
//                 <img
//                   src={event.image}
//                   alt={event.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-lg font-semibold text-slate-800">{event.name}</h3>
//                     <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm">
//                       {event.price}
//                     </span>
//                   </div>
//                   <p className="text-slate-600 text-sm mb-3">{event.date}</p>
//                   <p className="text-slate-600 mb-4">{event.venue}</p>
//                   <button className="w-full px-4 py-2 bg-orange-600/30 text-orange-700 rounded hover:bg-orange-600/40">
//                     Book Tickets
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {selectedEvent && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//               <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//                 <div className="relative">
//                   <button 
//                     onClick={() => setSelectedEvent(null)}
//                     className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 z-10"
//                   >
//                     <X size={24} />
//                   </button>
//                   <img
//                     src={selectedEvent.image}
//                     alt={selectedEvent.name}
//                     className="w-full h-80 object-cover"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <h2 className="text-2xl font-bold text-slate-800">{selectedEvent.name}</h2>
//                     <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-lg">
//                       {selectedEvent.price}
//                     </span>
//                   </div>
//                   <p className="text-slate-600 text-lg mb-3">{selectedEvent.date}</p>
//                   <p className="text-slate-600 text-lg mb-6">{selectedEvent.venue}</p>
//                   <p className="text-slate-700 mb-6">{selectedEvent.description}</p>
//                   <button className="w-full px-6 py-3 bg-orange-600/30 text-orange-700 rounded-lg text-lg font-medium hover:bg-orange-600/40">
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {filteredEvents.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-slate-600">No events found matching your criteria.</p>
//             </div>
//           )}

//           {filteredEvents.length > 0 && (
//             <div className="text-center mt-12">
//               <button className="px-8 py-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
//                 Load More Events
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default EventsPage;

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const events = [
  {
    id: 1,
    name: "Avengers: Final Chapter",
    price: "$29",
    date: "Thu, Apr 15 • 7:00 PM",
    venue: "AMC Theater • New York, NY",
    category: "movies",
    description: "Experience the epic conclusion of the Marvel saga in IMAX.",
    image: `/api/placeholder/400/250`
  },
  {
    id: 2,
    name: "Taylor Swift Concert",
    price: "$199",
    date: "Fri, Apr 16 • 8:00 PM",
    venue: "Madison Square Garden • New York, NY",
    category: "concerts",
    description: "The Eras Tour comes to New York City!",
    image: `/api/placeholder/400/250`
  },
  {
    id: 3,
    name: "Hamilton",
    price: "$149",
    date: "Sat, Apr 17 • 2:00 PM",
    venue: "Richard Rodgers Theatre • New York, NY",
    category: "theater",
    description: "Don't miss the Tony Award-winning musical phenomenon.",
    image: `/api/placeholder/400/250`
  },
  {
    id: 4,
    name: "NBA Finals Game 1",
    price: "$299",
    date: "Sun, Apr 18 • 8:30 PM",
    venue: "Barclays Center • Brooklyn, NY",
    category: "sports",
    description: "Witness the battle for basketball supremacy.",
    image: `/api/placeholder/400/250`
  },
  {
    id: 5,
    name: "Inception IMAX Re-release",
    price: "$24",
    date: "Mon, Apr 19 • 7:30 PM",
    venue: "IMAX Theater • Los Angeles, CA",
    category: "movies",
    description: "Christopher Nolan's masterpiece returns to IMAX screens.",
    image: `/api/placeholder/400/250`
  },
  {
    id: 6,
    name: "Ed Sheeran World Tour",
    price: "$159",
    date: "Tue, Apr 20 • 7:00 PM",
    venue: "SoFi Stadium • Los Angeles, CA",
    category: "concerts",
    description: "Global superstar's biggest tour yet.",
    image: `/api/placeholder/400/250`
  },
  {
    id: 7,
    name: "The Lion King",
    price: "$129",
    date: "Wed, Apr 21 • 7:30 PM",
    venue: "Minskoff Theatre • New York, NY",
    category: "theater",
    description: "Disney's award-winning musical spectacular.",
    image: `/api/placeholder/400/250`
  },
  {
    id: 8,
    name: "UFC 300",
    price: "$499",
    date: "Sat, Apr 24 • 10:00 PM",
    venue: "T-Mobile Arena • Las Vegas, NV",
    category: "sports",
    description: "Historic night of mixed martial arts action.",
    image: `/api/placeholder/400/250`
  },
  {
    id: 9,
    name: "Coldplay Concert",
    price: "$179",
    date: "Sun, Apr 25 • 8:00 PM",
    venue: "MetLife Stadium • East Rutherford, NJ",
    category: "concerts",
    description: "Music of the Spheres World Tour.",
    image: `/api/placeholder/400/250`
  },
  {
    id: 10,
    name: "Wicked",
    price: "$139",
    date: "Mon, Apr 26 • 7:00 PM",
    venue: "Gershwin Theatre • New York, NY",
    category: "theater",
    description: "The untold story of the witches of Oz.",
    image: `/api/placeholder/400/250`
  },
  {
    id: 11,
    name: "Formula 1 Miami GP",
    price: "$399",
    date: "Sun, May 2 • 3:30 PM",
    venue: "Miami International Autodrome • Miami, FL",
    category: "sports",
    description: "High-speed racing action in the heart of Miami.",
    image: `/api/placeholder/400/250`
  },
  {
    id: 12,
    name: "Oppenheimer",
    price: "$24",
    date: "Thu, May 6 • 7:00 PM",
    venue: "TCL Chinese Theatre • Los Angeles, CA",
    category: "movies",
    description: "Christopher Nolan's epic biographical thriller.",
    image: `/api/placeholder/400/250`
  }
];

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['all', 'movies', 'concerts', 'theater', 'sports'];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                      ? 'bg-blue-600/30 text-blue-700' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div 
                key={event.id} 
                className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden cursor-pointer transition hover:shadow-md"
                onClick={() => handleEventClick(event)}
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-slate-800">{event.name}</h3>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                      {event.price}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">{event.date}</p>
                  <p className="text-slate-600 mb-4">{event.venue}</p>
                  <button className="w-full px-4 py-2 bg-blue-600/30 text-blue-700 rounded hover:bg-blue-600/40">
                    Book Tickets
                  </button>
                </div>
              </div>
            ))}
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
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-lg">
                      {selectedEvent.price}
                    </span>
                  </div>
                  <p className="text-slate-600 text-lg mb-3">{selectedEvent.date}</p>
                  <p className="text-slate-600 text-lg mb-6">{selectedEvent.venue}</p>
                  <p className="text-slate-700 mb-6">{selectedEvent.description}</p>
                  <button className="w-full px-6 py-3 bg-blue-600/30 text-blue-700 rounded-lg text-lg font-medium hover:bg-blue-600/40">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600">No events found matching your criteria.</p>
            </div>
          )}

          {filteredEvents.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                Load More Events
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;