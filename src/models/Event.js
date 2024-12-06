import mongoose from 'mongoose';

const seatSectionSchema = new mongoose.Schema({
  type: String,
  price: Number,
  capacity: Number,
});

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 2000
  },
  eventType: {
    type: String,
    enum: ['Concert', 'Sports', 'Show', 'Movie', 'Art Expo'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  venueName: {
    type: String,
    required: true,
  },
  venueSize: {
    type: String,
    enum: ['Small', 'Medium', 'Large'],
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  seatSections: [seatSectionSchema],
  posterUrl: {
    type: String,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

export default Event; 