import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const SeatingPlan = ({ event, onSeatSelect }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seatingLayout, setSeatingLayout] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    fetchBookedSeats();
    generateSeatingLayout();
  }, [event, currentSectionIndex]);

  const fetchBookedSeats = async () => {
    if (!event?._id) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/event/${event._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookedSeats(data.map(booking => booking.seatNumber));
    } catch (error) {
      console.error('Error fetching booked seats:', error);
      setBookedSeats([]); // Set empty array as fallback
    }
  };

  const generateSeatingLayout = () => {
    if (!event?.seatSections) return;
  
    const layout = [];
    let seatCounter = 1;
  
    event.seatSections.forEach(section => {
      const sectionSeats = [];
      const seatsPerRow = 10;
      const numRows = Math.ceil(section.capacity / seatsPerRow);
  
      let remainingSeatsInSection = section.capacity;
  
      for (let row = 0; row < numRows && remainingSeatsInSection > 0; row++) {
        const rowSeats = [];
        const seatsInThisRow = Math.min(seatsPerRow, remainingSeatsInSection);
  
        for (let seat = 0; seat < seatsInThisRow; seat++) {
          rowSeats.push({
            number: seatCounter,
            section: section.type,
            price: section.price,
            row: String.fromCharCode(65 + row),
            isBooked: bookedSeats.includes(seatCounter)
          });
          seatCounter++;
          remainingSeatsInSection--;
        }
        sectionSeats.push(rowSeats);
      }
      layout.push({ type: section.type, rows: sectionSeats });
    });
  
    setSeatingLayout(layout);
  };

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;
    setSelectedSeat(seat);
    onSeatSelect(seat);
  };

  const currentSection = seatingLayout[currentSectionIndex];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setCurrentSectionIndex(prev => prev - 1)}
            disabled={currentSectionIndex === 0}
            className={`p-2 rounded-full ${
              currentSectionIndex === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h3 className="text-xl font-semibold">
            {currentSection?.type} Section - ${event.seatSections[currentSectionIndex]?.price}
          </h3>
          <button
            onClick={() => setCurrentSectionIndex(prev => prev + 1)}
            disabled={currentSectionIndex === seatingLayout.length - 1}
            className={`p-2 rounded-full ${
              currentSectionIndex === seatingLayout.length - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-center gap-8 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span>Booked</span>
          </div>
        </div>

        <div className="w-1/2 h-2 bg-gray-300 mx-auto mb-8"></div>
      </div>

      {currentSection && (
        <div className="space-y-2">
          {currentSection.rows.map((row, rIndex) => (
            <div key={rIndex} className="flex justify-center gap-2">
              <span className="w-6 text-center text-gray-500 text-sm">
                {String.fromCharCode(65 + rIndex)}
              </span>
              {row.map((seat) => (
                <button
                  key={seat.number}
                  onClick={() => handleSeatClick(seat)}
                  disabled={seat.isBooked}
                  className={`
                    w-8 h-8 rounded-md text-sm flex items-center justify-center
                    ${seat.isBooked ? 'bg-gray-400 cursor-not-allowed' : 
                      seat.number === selectedSeat?.number ? 'bg-blue-500 text-white' : 
                      'bg-gray-200 hover:bg-gray-300'}
                  `}
                >
                  {seat.number}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center gap-2">
        {event.seatSections.map((section, index) => (
          <button
            key={section.type}
            onClick={() => setCurrentSectionIndex(index)}
            className={`px-3 py-1 rounded-full text-sm ${
              currentSectionIndex === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {section.type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatingPlan; 