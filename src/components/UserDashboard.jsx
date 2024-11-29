// 'use client';
// import React, { useEffect, useState } from 'react';
// import { Download, LogOut } from 'lucide-react';
// import jsPDF from 'jspdf';
// import { useNavigate } from 'react-router-dom';
// import logo from '../assets/ScreenSeats.svg';

// const tickets = [
//   {
//     id: 1,
//     eventName: 'Summer Festival',
//     date: '2024-07-15',
//     ticketId: 'TK-2024-001',
//     location: 'Central Park'
//   },
//   {
//     id: 2,
//     eventName: 'Tech Conference',
//     date: '2024-08-20',
//     ticketId: 'TK-2024-002',
//     location: 'Convention Center'
//   }
// ];

// const UserDashboard = () => {

//   const navigate = useNavigate();

//   const [logoDataUrl, setLogoDataUrl] = useState('');

//   useEffect(() => {
//     // Convert SVG to data URL
//     const img = new Image();
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(img, 0, 0);
//       setLogoDataUrl(canvas.toDataURL('image/png'));
//     };
//     img.src = logo;
//   }, []);

//   const handleDownload = (ticket) => {
//     const doc = new jsPDF({
//       orientation: 'landscape',
//       unit: 'mm',
//       format: [210, 100]
//     });

//     if (logoDataUrl) {
//       doc.addImage(logoDataUrl, 'PNG', 85, 5, 40, 20);
//     }

//     // Rest of the PDF generation code...
//     doc.setDrawColor(0, 102, 204);
//     doc.setLineWidth(0.5);
//     doc.rect(5, 5, 200, 90);
//     doc.rect(8, 8, 194, 84);

//     doc.setFontSize(24);
//     doc.setTextColor(0, 102, 204);
//     doc.text(ticket.eventName, 105, 40, { align: 'center' });

//     doc.setFontSize(12);
//     doc.setTextColor(51, 51, 51);
//     doc.text(`Date: ${ticket.date}`, 20, 55);
//     doc.text(`Location: ${ticket.location}`, 20, 65);
//     doc.text(`Ticket ID: ${ticket.ticketId}`, 150, 55);

//     doc.setFillColor(240, 240, 240);
//     doc.rect(150, 60, 30, 30, 'F');
//     doc.setFontSize(8);
//     doc.text('QR Code', 165, 75, { align: 'center' });

//     doc.setFontSize(8);
//     doc.setTextColor(128, 128, 128);
//     doc.text('Powered by ScreenSeats', 105, 90, { align: 'center' });

//     doc.save(`ticket-${ticket.ticketId}.pdf`);
//   };


//   const handleLogout = () => {
//     // Add any logout logic here (e.g., clearing tokens)
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">My Tickets</h1>
//         <button 
//           onClick={handleLogout}
//           className="flex items-center gap-2 px-4 py-2 bg-red-600/40 text-red-500 rounded-md hover:bg-red-700/40 hover:text-white"
//         >
//           <LogOut className="h-4 w-4" />
//           Logout
//         </button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {tickets.map(ticket => (
//           <div key={ticket.id} className="bg-white rounded-lg shadow p-4">
//             <div className="flex justify-between items-start mb-2">
//               <h3 className="font-bold text-lg">{ticket.eventName}</h3>
//               <button 
//                 onClick={() => handleDownload(ticket)}
//                 className="p-2 hover:bg-gray-100 rounded-full"
//               >
//                 <Download className="h-5 w-5 text-blue-600" />
//               </button>
//             </div>
//             <p className="text-gray-600">Date: {ticket.date}</p>
//             <p className="text-gray-600">Location: {ticket.location}</p>
//             <p className="text-sm text-gray-500 mt-2">Ticket ID: {ticket.ticketId}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;

'use client';
import React, { useEffect, useState } from 'react';
import { Download, LogOut } from 'lucide-react';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ScreenSeats.svg';

const tickets = [
  {
    id: 1,
    eventName: 'Summer Festival',
    date: '2024-07-15',
    ticketId: 'TK-2024-001',
    location: 'Central Park'
  },
  {
    id: 2,
    eventName: 'Tech Conference',
    date: '2024-08-20',
    ticketId: 'TK-2024-002',
    location: 'Convention Center'
  }
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [logoDataUrl, setLogoDataUrl] = useState('');

  useEffect(() => {
    // Convert SVG to data URL with fixed dimensions
    const img = new Image();
    img.onload = () => {
      // Maintain aspect ratio with fixed width
      const targetWidth = 150;
      const aspectRatio = img.width / img.height;
      const targetHeight = targetWidth / aspectRatio;
      
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      setLogoDataUrl(canvas.toDataURL('image/png'));
    };
    img.src = logo;
  }, []);

  const handleDownload = (ticket) => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [210, 100]
    });

    // Add logo with preserved aspect ratio
    if (logoDataUrl) {
      const logoWidth = 30;
      const logoX = (210 - logoWidth) / 2; // Center horizontally
      doc.addImage(logoDataUrl, 'PNG', logoX, 10, logoWidth, 15);
    }

    // Add ticket details with improved spacing and typography
    doc.setFontSize(24);
    doc.setTextColor(0, 102, 204);
    doc.text(ticket.eventName, 105, 40, { align: 'center' });

    // Main ticket information with better layout
    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51);
    
    // Left column
    doc.text('Date:', 20, 55);
    doc.text(ticket.date, 45, 55);
    
    doc.text('Location:', 20, 65);
    doc.text(ticket.location, 45, 65);
    
    // Right column
    doc.text('Ticket ID:', 130, 55);
    doc.text(ticket.ticketId, 155, 55);

    // QR Code placeholder with subtle background
    doc.setFillColor(248, 248, 248);
    doc.rect(150, 60, 30, 30, 'F');
    doc.setFontSize(8);
    doc.text('QR Code', 165, 75, { align: 'center' });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Powered by ScreenSeats', 105, 90, { align: 'center' });

    doc.save(`ticket-${ticket.ticketId}.pdf`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tickets</h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600/40 text-red-500 rounded-md hover:bg-red-700/40 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tickets.map(ticket => (
          <div key={ticket.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{ticket.eventName}</h3>
              <button 
                onClick={() => handleDownload(ticket)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Download className="h-5 w-5 text-blue-600" />
              </button>
            </div>
            <p className="text-gray-600">Date: {ticket.date}</p>
            <p className="text-gray-600">Location: {ticket.location}</p>
            <p className="text-sm text-gray-500 mt-2">Ticket ID: {ticket.ticketId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;