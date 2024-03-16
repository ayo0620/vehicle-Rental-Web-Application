// routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Vehicle = require('../models/vehicle');
const jwt = require('jsonwebtoken');

// Middleware to authenticate admin
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  const tokenWithoutBearer = token.split(' ')[1];
  console.log('Received token:', tokenWithoutBearer);
  if (!tokenWithoutBearer) {
      return res.status(401).json({ message: 'Authorization token missing' });
  }

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
          return res.status(401).json({ message: 'Invalid token' });
      }
      
      console.log('Decoded token:', decodedToken);
      if (decodedToken.role !== 'admin') {
          return res.status(403).json({ message: 'You are not authorized to access this resource' });
      }
      req.decodedToken = decodedToken;
      next();
  });
};

// Get all bookings
router.get('/', authenticateAdmin, async (req, res) => {
    try {
        const bookings = await Booking.find().populate('vehicle').populate('user');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new booking
router.post('/', async (req, res) => {
    const adminId = req.decodedToken.userId;

    const booking = new Booking({
        vehicleId: req.body.vehicleId,
        userId: req.body.userId,
        totalAmount: req.body.totalAmount,
        status: req.body.status,
        dateOrdered: req.body.dateOrdered,
        createdBy: adminId,
    });

    try {
        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a booking by ID
router.get('/:id', authenticateAdmin, async (req, res) => {
  try {
      const booking = await Booking.findById(req.params.id).populate('vehicle').populate('user');
      if (!booking) {
          return res.status(404).json({ message: 'Booking not found' });
      }
      res.json(booking);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Update a booking
router.patch('/:id', authenticateAdmin, async (req, res) => {
  try {
      const { status } = req.body;
      const { id } = req.params;

      // Fetch the booking by ID
      const booking = await Booking.findById(id);
      if (!booking) {
          return res.status(404).json({ message: 'Booking not found' });
      }

      // Update the booking status
      booking.status = status;
      await booking.save();

      // If the booking is confirmed, update vehicle availability
      if (status === 'Confirmed') {
          const vehicle = await Vehicle.findById(booking.vehicleId);
          if (vehicle) {
              vehicle.availability = false;
              await vehicle.save();
          }
      }

      // If the booking is declined, update vehicle availability if necessary
      if (status === 'Declined') {
          const vehicle = await Vehicle.findById(booking.vehicleId);
          if (vehicle) {
              vehicle.availability = true;
              await vehicle.save();
          }
      }

      res.json(booking);
  } catch (error) {
      console.error('Error updating booking status:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a booking
router.delete('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        await booking.remove();
        res.json({ message: 'Booking deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
