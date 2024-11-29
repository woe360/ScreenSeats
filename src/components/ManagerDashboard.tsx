// import React, { useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { Pencil, Trash2, Plus, X } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog';
// import { Input } from '@/ui/input';
// import { Button } from '@/ui/button';
// import { Textarea } from '@/ui/textarea';

// const initialRevenueData = [
//   { month: 'Jan', revenue: 4000 },
//   { month: 'Feb', revenue: 6000 },
//   { month: 'Mar', revenue: 5500 },
//   { month: 'Apr', revenue: 7800 },
//   { month: 'May', revenue: 8900 },
//   { month: 'Jun', revenue: 9000 },
// ];

// const initialEvents = [
//   {
//     id: 1,
//     title: 'Summer Festival',
//     date: '2024-07-15',
//     capacity: 1000,
//     soldTickets: 750,
//     price: 49.99,
//     description: 'Annual summer music festival featuring local and international artists',
//     imageUrl: '/api/placeholder/400/300',
//   },
//   {
//     id: 2,
//     title: 'Tech Conference',
//     date: '2024-08-20',
//     capacity: 500,
//     soldTickets: 320,
//     price: 299.99,
//     description: 'Innovation and technology conference with industry leaders',
//     imageUrl: '/api/placeholder/400/300',
//   }
// ];

// const ManagerDashboard = () => {
//   const [currentView, setCurrentView] = useState('main');
//   const [events, setEvents] = useState(initialEvents);
//   const [revenueData, setRevenueData] = useState(initialRevenueData);
//   const [editingEvent, setEditingEvent] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const EventForm = ({ event, onSubmit, onClose }) => {
//     const [formData, setFormData] = useState(event || {
//       title: '',
//       date: '',
//       capacity: '',
//       price: '',
//       description: '',
//       imageUrl: '/api/placeholder/400/300',
//       soldTickets: 0
//     });

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       onSubmit(formData);
//       onClose();
//     };

//     return (
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input
//           placeholder="Event Title"
//           value={formData.title}
//           onChange={e => setFormData({...formData, title: e.target.value})}
//           required
//         />
//         <Input
//           type="date"
//           value={formData.date}
//           onChange={e => setFormData({...formData, date: e.target.value})}
//           required
//         />
//         <Input
//           type="number"
//           placeholder="Capacity"
//           value={formData.capacity}
//           onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})}
//           required
//         />
//         <Input
//           type="number"
//           step="0.01"
//           placeholder="Price"
//           value={formData.price}
//           onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
//           required
//         />
//         <Textarea
//           placeholder="Description"
//           value={formData.description}
//           onChange={e => setFormData({...formData, description: e.target.value})}
//           required
//         />
//         <Button type="submit" className="w-full">
//           {event ? 'Update Event' : 'Create Event'}
//         </Button>
//       </form>
//     );
//   };

//   const RevenueGraph = () => (
//     <Card>
//       <CardHeader>
//         <CardTitle>Revenue Overview</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="h-64">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={revenueData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="revenue" stroke="#2563eb" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   const handleAddEvent = (newEvent) => {
//     const event = {
//       ...newEvent,
//       id: events.length + 1,
//     };
//     setEvents([...events, event]);
//   };

//   const handleEditEvent = (updatedEvent) => {
//     setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
//   };

//   const handleDeleteEvent = (id) => {
//     setEvents(events.filter(e => e.id !== id));
//   };

//   return (
//     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Event Manager Dashboard</h1>
//         {currentView !== 'main' && (
//           <Button onClick={() => setCurrentView('main')} variant="outline">
//             Back to Dashboard
//           </Button>
//         )}
//       </div>
      
//       {currentView === 'main' && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <RevenueGraph />
//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Actions</CardTitle>
//             </CardHeader>
//             <CardContent className="grid grid-cols-2 gap-4">
//               <Button onClick={() => setCurrentView('events')} className="h-24">
//                 Manage Events
//               </Button>
//               <Button onClick={() => setCurrentView('sales')} className="h-24">
//                 Sales Dashboard
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {currentView === 'events' && (
//         <>
//           <div className="flex justify-end mb-4">
//             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//               <DialogTrigger asChild>
//                 <Button>
//                   <Plus className="mr-2 h-4 w-4" /> Add Event
//                 </Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
//                 </DialogHeader>
//                 <EventForm
//                   event={editingEvent}
//                   onSubmit={editingEvent ? handleEditEvent : handleAddEvent}
//                   onClose={() => {
//                     setIsDialogOpen(false);
//                     setEditingEvent(null);
//                   }}
//                 />
//               </DialogContent>
//             </Dialog>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {events.map(event => (
//               <Card key={event.id}>
//                 <img
//                   src={event.imageUrl}
//                   alt={event.title}
//                   className="w-full h-48 object-cover rounded-t-lg"
//                 />
//                 <CardContent className="p-4">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h3 className="font-bold text-lg">{event.title}</h3>
//                       <p className="text-sm text-gray-500">{event.date}</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => {
//                           setEditingEvent(event);
//                           setIsDialogOpen(true);
//                         }}
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleDeleteEvent(event.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-4">{event.description}</p>
//                   <div className="flex justify-between text-sm">
//                     <span>Price: ${event.price}</span>
//                     <span>Capacity: {event.capacity}</span>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </>
//       )}

//       {currentView === 'sales' && (
//         <div className="space-y-6">
//           <RevenueGraph />
//           <Card>
//             <CardHeader>
//               <CardTitle>Events Overview</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b">
//                       <th className="text-left p-4">Event</th>
//                       <th className="text-left p-4">Date</th>
//                       <th className="text-right p-4">Price</th>
//                       <th className="text-right p-4">Sold</th>
//                       <th className="text-right p-4">Revenue</th>
//                       <th className="text-right p-4">Available</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {events.map(event => (
//                       <tr key={event.id} className="border-b">
//                         <td className="p-4">{event.title}</td>
//                         <td className="p-4">{event.date}</td>
//                         <td className="text-right p-4">${event.price}</td>
//                         <td className="text-right p-4">{event.soldTickets}</td>
//                         <td className="text-right p-4">
//                           ${(event.soldTickets * event.price).toLocaleString()}
//                         </td>
//                         <td className="text-right p-4">{event.capacity - event.soldTickets}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManagerDashboard;




// import React, { useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { Pencil, Trash2, Plus, X } from 'lucide-react';

// const initialRevenueData = [
//   { month: 'Jan', revenue: 4000 },
//   { month: 'Feb', revenue: 6000 },
//   { month: 'Mar', revenue: 5500 },
//   { month: 'Apr', revenue: 7800 },
//   { month: 'May', revenue: 8900 },
//   { month: 'Jun', revenue: 9000 },
// ];

// const initialEvents = [
//   {
//     id: 1,
//     title: 'Summer Festival',
//     date: '2024-07-15',
//     capacity: 1000,
//     soldTickets: 750,
//     price: 49.99,
//     description: 'Annual summer music festival featuring local and international artists',
//     imageUrl: '/api/placeholder/400/300',
//   },
//   {
//     id: 2,
//     title: 'Tech Conference',
//     date: '2024-08-20',
//     capacity: 500,
//     soldTickets: 320,
//     price: 299.99,
//     description: 'Innovation and technology conference with industry leaders',
//     imageUrl: '/api/placeholder/400/300',
//   }
// ];

// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;
  
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">{title}</h2>
//           <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// };

// const ManagerDashboard = () => {
//   const [currentView, setCurrentView] = useState('main');
//   const [events, setEvents] = useState(initialEvents);
//   const [revenueData, setRevenueData] = useState(initialRevenueData);
//   const [editingEvent, setEditingEvent] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const EventForm = ({ event, onSubmit, onClose }) => {
//     const [formData, setFormData] = useState(event || {
//       title: '',
//       date: '',
//       capacity: '',
//       price: '',
//       description: '',
//       imageUrl: '/api/placeholder/400/300',
//       soldTickets: 0
//     });

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       onSubmit(formData);
//       onClose();
//     };

//     return (
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Event Title"
//           value={formData.title}
//           onChange={e => setFormData({...formData, title: e.target.value})}
//           required
//         />
//         <input
//           className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           type="date"
//           value={formData.date}
//           onChange={e => setFormData({...formData, date: e.target.value})}
//           required
//         />
//         <input
//           className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           type="number"
//           placeholder="Capacity"
//           value={formData.capacity}
//           onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})}
//           required
//         />
//         <input
//           className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           type="number"
//           step="0.01"
//           placeholder="Price"
//           value={formData.price}
//           onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
//           required
//         />
//         <textarea
//           className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Description"
//           value={formData.description}
//           onChange={e => setFormData({...formData, description: e.target.value})}
//           required
//           rows={4}
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//         >
//           {event ? 'Update Event' : 'Create Event'}
//         </button>
//       </form>
//     );
//   };

//   const RevenueGraph = () => (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-bold mb-4">Revenue Overview</h2>
//       <div className="h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={revenueData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="revenue" stroke="#2563eb" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );

//   const handleAddEvent = (newEvent) => {
//     const event = {
//       ...newEvent,
//       id: events.length + 1,
//     };
//     setEvents([...events, event]);
//   };

//   const handleEditEvent = (updatedEvent) => {
//     setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
//   };

//   const handleDeleteEvent = (id) => {
//     setEvents(events.filter(e => e.id !== id));
//   };

//   return (
//     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Event Manager Dashboard</h1>
//         {currentView !== 'main' && (
//           <button
//             onClick={() => setCurrentView('main')}
//             className="px-4 py-2 border rounded hover:bg-gray-50"
//           >
//             Back to Dashboard
//           </button>
//         )}
//       </div>
      
//       {currentView === 'main' && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <RevenueGraph />
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <button
//                 onClick={() => setCurrentView('events')}
//                 className="h-24 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//               >
//                 Manage Events
//               </button>
//               <button
//                 onClick={() => setCurrentView('sales')}
//                 className="h-24 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//               >
//                 Sales Dashboard
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {currentView === 'events' && (
//         <>
//           <div className="flex justify-end mb-4">
//             <button
//               onClick={() => {
//                 setEditingEvent(null);
//                 setIsModalOpen(true);
//               }}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
//             >
//               <Plus className="mr-2 h-4 w-4" /> Add Event
//             </button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {events.map(event => (
//               <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
//                 <img
//                   src={event.imageUrl}
//                   alt={event.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h3 className="font-bold text-lg">{event.title}</h3>
//                       <p className="text-sm text-gray-500">{event.date}</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         className="p-2 hover:bg-gray-100 rounded"
//                         onClick={() => {
//                           setEditingEvent(event);
//                           setIsModalOpen(true);
//                         }}
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </button>
//                       <button
//                         className="p-2 hover:bg-gray-100 rounded"
//                         onClick={() => handleDeleteEvent(event.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-4">{event.description}</p>
//                   <div className="flex justify-between text-sm">
//                     <span>Price: ${event.price}</span>
//                     <span>Capacity: {event.capacity}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}

//       {currentView === 'sales' && (
//         <div className="space-y-6">
//           <RevenueGraph />
//           <div className="bg-white rounded-lg shadow">
//             <div className="p-4 border-b">
//               <h2 className="text-xl font-bold">Events Overview</h2>
//             </div>
//             <div className="p-4 overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b">
//                     <th className="text-left p-4">Event</th>
//                     <th className="text-left p-4">Date</th>
//                     <th className="text-right p-4">Price</th>
//                     <th className="text-right p-4">Sold</th>
//                     <th className="text-right p-4">Revenue</th>
//                     <th className="text-right p-4">Available</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {events.map(event => (
//                     <tr key={event.id} className="border-b">
//                       <td className="p-4">{event.title}</td>
//                       <td className="p-4">{event.date}</td>
//                       <td className="text-right p-4">${event.price}</td>
//                       <td className="text-right p-4">{event.soldTickets}</td>
//                       <td className="text-right p-4">
//                         ${(event.soldTickets * event.price).toLocaleString()}
//                       </td>
//                       <td className="text-right p-4">{event.capacity - event.soldTickets}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditingEvent(null);
//         }}
//         title={editingEvent ? 'Edit Event' : 'Add New Event'}
//       >
//         <EventForm
//           event={editingEvent}
//           onSubmit={editingEvent ? handleEditEvent : handleAddEvent}
//           onClose={() => {
//             setIsModalOpen(false);
//             setEditingEvent(null);
//           }}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default ManagerDashboard;


import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Pencil, Trash2, Plus, X, LayoutDashboard, Calendar, LineChart as ChartIcon } from 'lucide-react';
import ScreenSeatsLogo from '../assets/ScreenSeats.svg';

const initialRevenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 6000 },
  { month: 'Mar', revenue: 5500 },
  { month: 'Apr', revenue: 7800 },
  { month: 'May', revenue: 8900 },
  { month: 'Jun', revenue: 9000 },
];

const initialEvents = [
  {
    id: 1,
    title: 'Summer Festival',
    date: '2024-07-15',
    capacity: 1000,
    soldTickets: 750,
    price: 49.99,
    description: 'Annual summer music festival featuring local and international artists',
    imageUrl: '/api/placeholder/400/300',
  },
  {
    id: 2,
    title: 'Tech Conference',
    date: '2024-08-20',
    capacity: 500,
    soldTickets: 320,
    price: 299.99,
    description: 'Innovation and technology conference with industry leaders',
    imageUrl: '/api/placeholder/400/300',
  }
];

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Sidebar = ({ currentView, setCurrentView }) => (
  <div className="fixed left-0 top-0 h-full w-60 bg-gray-800 text-white p-6">
    <div className="flex items-center cursor-pointer">
      <img
        src={ScreenSeatsLogo} 
        alt="ScreenSeats Logo" 
        className="h-8 mx-auto mb-5 w-auto"
      />
     </div>
    <nav className="space-y-2">
      <button
        onClick={() => setCurrentView('main')}
        className={`w-full flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
          currentView === 'main' ? 'bg-gray-600' : 'hover:bg-gray-700'
        }`}
      >
        <LayoutDashboard className="h-5 w-5" />
        <span>Dashboard</span>
      </button>
      <button
        onClick={() => setCurrentView('events')}
        className={`w-full flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
          currentView === 'events' ? 'bg-gray-600' : 'hover:bg-gray-700'
        }`}
      >
        <Calendar className="h-5 w-5" />
        <span>Events</span>
      </button>
      <button
        onClick={() => setCurrentView('sales')}
        className={`w-full flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
          currentView === 'sales' ? 'bg-gray-600' : 'hover:bg-gray-700'
        }`}
      >
        <ChartIcon className="h-5 w-5" />
        <span>Sales</span>
      </button>
    </nav>
  </div>
);

const ManagerDashboard = () => {
  const [currentView, setCurrentView] = useState('main');
  const [events, setEvents] = useState(initialEvents);
  const [revenueData, setRevenueData] = useState(initialRevenueData);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const EventForm = ({ event, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(event || {
      title: '',
      date: '',
      capacity: '',
      price: '',
      description: '',
      imageUrl: '/api/placeholder/400/300',
      soldTickets: 0
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Event Title"
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
          required
        />
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          value={formData.date}
          onChange={e => setFormData({...formData, date: e.target.value})}
          required
        />
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})}
          required
        />
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
          required
        />
        <textarea
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
          required
          rows={4}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          {event ? 'Update Event' : 'Create Event'}
        </button>
      </form>
    );
  };

  const RevenueGraph = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Revenue Overview</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const handleAddEvent = (newEvent) => {
    const event = {
      ...newEvent,
      id: events.length + 1,
    };
    setEvents([...events, event]);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="ml-64 w-full p-6 space-y-6">
        {currentView === 'main' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <RevenueGraph />
          </>
        )}

        {currentView === 'events' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Events</h2>
              <button
                onClick={() => {
                  setEditingEvent(null);
                  setIsModalOpen(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{event.title}</h3>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          onClick={() => {
                            setEditingEvent(event);
                            setIsModalOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                    <div className="flex justify-between text-sm">
                      <span>Price: ${event.price}</span>
                      <span>Capacity: {event.capacity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {currentView === 'sales' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Sales Overview</h2>
            <div className="space-y-6">
              <RevenueGraph />
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="text-xl font-bold">Events Overview</h3>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Event</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-right p-4">Price</th>
                        <th className="text-right p-4">Sold</th>
                        <th className="text-right p-4">Revenue</th>
                        <th className="text-right p-4">Available</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map(event => (
                        <tr key={event.id} className="border-b">
                          <td className="p-4">{event.title}</td>
                          <td className="p-4">{event.date}</td>
                          <td className="text-right p-4">${event.price}</td>
                          <td className="text-right p-4">{event.soldTickets}</td>
                          <td className="text-right p-4">
                            ${(event.soldTickets * event.price).toLocaleString()}
                          </td>
                          <td className="text-right p-4">{event.capacity - event.soldTickets}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEvent(null);
          }}
          title={editingEvent ? 'Edit Event' : 'Add New Event'}
        >
          <EventForm
            event={editingEvent}
            onSubmit={editingEvent ? handleEditEvent : handleAddEvent}
            onClose={() => {
              setIsModalOpen(false);
              setEditingEvent(null);
            }}
          />
        </Modal>
      </main>
    </div>
  );
};

export default ManagerDashboard;