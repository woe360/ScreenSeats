import React, { useState } from 'react';
import { X } from 'lucide-react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: any) => void;
  event?: any;
}

const VENUE_CONFIGURATIONS = {
  Small: {
    capacity: 50,
    sections: [
      { type: 'Standard', capacity: 30, price: 50 },
      { type: 'VIP', capacity: 20, price: 100 }
    ]
  },
  Medium: {
    capacity: 100,
    sections: [
      { type: 'Economy', capacity: 40, price: 30 },
      { type: 'Standard', capacity: 40, price: 50 },
      { type: 'VIP', capacity: 20, price: 100 }
    ]
  },
  Large: {
    capacity: 150,
    sections: [
      { type: 'Economy', capacity: 50, price: 30 },
      { type: 'Standard', capacity: 60, price: 50 },
      { type: 'Premium', capacity: 25, price: 80 },
      { type: 'VIP', capacity: 15, price: 120 }
    ]
  }
};

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSubmit, event }) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    eventType: event?.eventType || 'Sports',
    date: event?.date?.split('T')[0] || '',
    time: event?.time || '',
    venueName: event?.venueName || '',
    venueSize: event?.venueSize || 'Small',
    capacity: event?.capacity || VENUE_CONFIGURATIONS.Small.capacity,
    posterUrl: event?.posterUrl || '',
    seatSections: event?.seatSections || VENUE_CONFIGURATIONS.Small.sections
  });

  const [posterFile, setPosterFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(formData.posterUrl);

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      setPosterFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let finalPosterUrl = formData.posterUrl;
      
      if (posterFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', posterFile);
        
        const uploadResponse = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: uploadFormData
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload poster');
        }

        const uploadData = await uploadResponse.json();
        finalPosterUrl = uploadData.url;
      }

      await onSubmit({
        ...formData,
        posterUrl: finalPosterUrl
      });
    } catch (error) {
      console.error('Error in form submission:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'venueSize') {
      setFormData({
        ...formData,
        venueSize: value,
        capacity: VENUE_CONFIGURATIONS[value].capacity,
        seatSections: VENUE_CONFIGURATIONS[value].sections.map(section => ({
          type: section.type,
          capacity: section.capacity,
          price: section.price
        }))
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSectionPriceChange = (index: number, price: number) => {
    const newSections = [...formData.seatSections];
    newSections[index] = { ...newSections[index], price };
    setFormData({ ...formData, seatSections: newSections });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">
            {event ? 'Edit Event' : 'Add New Event'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>

            <div>
              <label className="block mb-1">Event Type</label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option>Sports</option>
                <option>Concert</option>
                <option>Theater</option>
                <option>Movie</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Venue Size</label>
              <select
                name="venueSize"
                value={formData.venueSize}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1">Venue Name</label>
              <input
                type="text"
                name="venueName"
                value={formData.venueName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Event Poster</label>
            <input
              type="file"
              onChange={handlePosterChange}
              accept="image/*"
              className="w-full mb-2"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded"
              />
            )}
          </div>

          <div>
            <label className="block mb-2">Seat Sections</label>
            <div className="space-y-3">
              {formData.seatSections.map((section, index) => (
                <div key={section.type} className="flex items-center gap-4 bg-gray-50 p-3 rounded">
                  <div className="flex-1">
                    <p className="font-medium">{section.type}</p>
                    <p className="text-sm text-gray-500">Capacity: {section.capacity}</p>
                  </div>
                  <div className="w-32">
                    <label className="text-sm text-gray-600">Price ($)</label>
                    <input
                      type="number"
                      value={section.price}
                      onChange={(e) => handleSectionPriceChange(index, Number(e.target.value))}
                      className="w-full p-2 border rounded"
                      min="0"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {event ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal; 