import React, { useState, useEffect } from 'react';
import { VENUE_CONFIGURATIONS } from '../config/venueConfigurations';

const EventForm = ({ event, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: '',
    date: '',
    time: '',
    venueName: '',
    venueSize: 'small',
    posterUrl: '',
    seatSections: VENUE_CONFIGURATIONS.small.sections.map(section => ({
      type: section.type,
      capacity: section.defaultCapacity,
      price: 0
    }))
  });

  const [posterFile, setPosterFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (event) {
      const eventDate = new Date(event.date);
      setFormData({
        ...event,
        date: eventDate.toISOString().split('T')[0],
      });
      setPreviewUrl(event.posterUrl);
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'venueSize') {
      setFormData({
        ...formData,
        venueSize: value,
        seatSections: VENUE_CONFIGURATIONS[value].sections.map(section => ({
          type: section.type,
          capacity: section.defaultCapacity,
          price: 0
        }))
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

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

  const handleSubmit = async (e) => {
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
          throw new Error(`Upload failed with status: ${uploadResponse.status}`);
        }

        const uploadData = await uploadResponse.json();
        finalPosterUrl = uploadData.url;
      }

      // Calculate total capacity from sections
      const totalCapacity = formData.seatSections.reduce((sum, section) => sum + section.capacity, 0);

      // Get seller ID from localStorage
      const user = JSON.parse(localStorage.getItem('user'));

      await onSubmit({
        ...formData,
        venueSize: formData.venueSize.charAt(0).toUpperCase() + formData.venueSize.slice(1), // Capitalize
        capacity: totalCapacity,
        posterUrl: finalPosterUrl,
        sellerId: user._id
      });
      onClose();
    } catch (error) {
      console.error('Error in form submission:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Event Type</label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select type</option>
            <option value="Concert">Concert</option>
            <option value="Sports">Sports</option>
            <option value="Show">Show</option>
            <option value="Movie">Movie</option>
            <option value="Art Expo">Art Expo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Venue Name</label>
          <input
            type="text"
            name="venueName"
            value={formData.venueName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Venue Size</label>
          <select
            name="venueSize"
            value={formData.venueSize}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            {Object.entries(VENUE_CONFIGURATIONS).map(([key, config]) => (
              <option key={key} value={key}>
                {config.size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Event Poster</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePosterChange}
          className="mt-1 block w-full"
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="mt-2 h-48 w-full object-cover rounded"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Seat Sections</label>
        {formData.seatSections.map((section, index) => (
          <div key={section.type} className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{section.type}</label>
              <p className="text-sm text-gray-500">Capacity: {section.capacity}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                value={section.price}
                onChange={(e) => {
                  const newSections = [...formData.seatSections];
                  newSections[index].price = Number(e.target.value);
                  setFormData({ ...formData, seatSections: newSections });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                min="0"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
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
  );
};

export default EventForm; 