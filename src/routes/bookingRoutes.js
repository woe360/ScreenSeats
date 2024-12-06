import express from 'express';
import Booking from '../models/Booking.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all bookings for an event
router.get('/event/:eventId', async (req, res) => {
  try {
    const bookings = await Booking.find({ eventId: req.params.eventId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new booking
router.post('/', protect, async (req, res) => {
  try {
    if (!req.user || req.user.userType !== 'buyer') {
      return res.status(403).json({ message: 'Only buyers can book tickets' });
    }

    const booking = new Booking({
      eventId: req.body.eventId,
      userId: req.user._id,
      seatNumber: req.body.seatNumber,
      sectionType: req.body.sectionType,
      price: req.body.price,
      bookingDate: new Date()
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get user's bookings
router.get('/user', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('eventId')
      .sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/sales', protect, async (req, res) => {
  try {
    const { range } = req.query;
    const user = req.user;
    
    // Get date range
    const endDate = new Date();
    const startDate = new Date();
    switch(range) {
      case '24h':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '12m':
        startDate.setMonth(startDate.getMonth() - 12);
        break;
    }

    const bookings = await Booking.find({
      sellerId: user._id,
      createdAt: { $gte: startDate, $lte: endDate }
    })
    .populate('eventId')
    .populate('userId', 'username fullName');

    // Format data for chart
    const chartData = {
      // Format your chart data here based on the range
    };

    res.json({
      sales: bookings.map(booking => ({
        _id: booking._id,
        date: booking.createdAt,
        eventTitle: booking.eventId.title,
        customerName: booking.userId.fullName || booking.userId.username,
        amount: booking.price
      })),
      chartData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 