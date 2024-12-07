import express from 'express';
import Booking from '../models/Booking.js';
import { protect } from '../middleware/authMiddleware.js';
import Event from '../models/Event.js';

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
    
    // Define date range first
    const endDate = new Date();
    const startDate = new Date();
    let interval = 'day';

    switch(range) {
      case '24h':
        startDate.setDate(startDate.getDate() - 1);
        interval = 'hour';
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '12m':
        startDate.setMonth(startDate.getMonth() - 12);
        interval = 'month';
        break;
    }

    // Get seller's events and bookings
    const sellerEvents = await Event.find({ sellerId: user._id });
    const sellerEventIds = sellerEvents.map(event => event._id);

    const bookings = await Booking.find({
      eventId: { $in: sellerEventIds },
      bookingDate: { $gte: startDate, $lte: endDate }
    })
    .populate('eventId')
    .populate('userId', 'username fullName')
    .sort({ bookingDate: 1 });

    // Generate labels and values based on the time range
    let labels = [];
    let values = [];

    if (interval === 'hour') {
      for (let i = 0; i < 24; i++) {
        const date = new Date(startDate);
        date.setHours(startDate.getHours() + i);
        labels.push(date.toLocaleTimeString([], { hour: '2-digit' }));
        
        const hourlyTotal = bookings
          .filter(booking => {
            const bookingDate = new Date(booking.bookingDate);
            return bookingDate.getHours() === date.getHours() &&
                   bookingDate.getDate() === date.getDate();
          })
          .reduce((sum, booking) => sum + booking.price, 0);
        
        values.push(hourlyTotal);
      }
    } else if (interval === 'month') {
      for (let i = 0; i < 12; i++) {
        const date = new Date(startDate);
        date.setMonth(startDate.getMonth() + i);
        labels.push(date.toLocaleString('default', { month: 'short' }));
        
        const monthlyTotal = bookings
          .filter(booking => {
            const bookingDate = new Date(booking.bookingDate);
            return bookingDate.getMonth() === date.getMonth();
          })
          .reduce((sum, booking) => sum + booking.price, 0);
        
        values.push(monthlyTotal);
      }
    } else {
      const days = range === '7d' ? 7 : 30;
      for (let i = 0; i < days; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        labels.push(date.toLocaleDateString([], { month: 'short', day: 'numeric' }));
        
        const dailyTotal = bookings
          .filter(booking => {
            const bookingDate = new Date(booking.bookingDate);
            return bookingDate.getDate() === date.getDate() &&
                   bookingDate.getMonth() === date.getMonth();
          })
          .reduce((sum, booking) => sum + booking.price, 0);
        
        values.push(dailyTotal);
      }
    }

    res.json({
      sales: bookings.map(booking => ({
        _id: booking._id,
        date: booking.bookingDate,
        eventTitle: booking.eventId.title,
        customerName: booking.userId.fullName || booking.userId.username,
        amount: booking.price
      })),
      labels,
      values
    });
  } catch (error) {
    console.error('Sales route error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router; 