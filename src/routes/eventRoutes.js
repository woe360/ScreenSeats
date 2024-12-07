import express from 'express';
import Event from '../models/Event.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes should come before routes with parameters
// Get all public events
router.get('/public', async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ date: 1 })
      .select('-sellerId');
    res.json(events);
  } catch (error) {
    console.error('Error fetching public events:', error);
    res.status(500).json({ message: error.message });
  }
});

// Protected routes for sellers
router.get('/seller', protect, async (req, res) => {
  try {
    console.log('User in request:', req.user);
    console.log('User ID:', req.user._id);
    
    const events = await Event.find({
      sellerId: req.user._id
    });
    
    console.log('Found events:', events);
    res.json(events);
  } catch (error) {
    console.error('Error in events route:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Create a new event
router.post('/', protect, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      sellerId: req.user._id
    });
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }


  router.delete('/:id', protect, async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (event.sellerId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this event' });
      }
  
      await Event.findByIdAndDelete(req.params.id);
      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
});

export default router; 