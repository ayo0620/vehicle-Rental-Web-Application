const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Vehicle = require('../models/vehicle');
const mongoose = require('mongoose');
const moment = require('moment');
const Booking = require('../models/booking');


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

// Total Listings for the Admin
router.get('/total-listings', authenticateAdmin, async (req, res) => {
  const adminId = req.decodedToken.userId;

  try {
      let dateSevenDaysAgo = new Date();
      dateSevenDaysAgo.setDate(dateSevenDaysAgo.getDate() - 7);
      console.log('Date seven days ago:', dateSevenDaysAgo);

      const listingsData = await Vehicle.aggregate([
          {
              $match: {
                  createdBy: new mongoose.Types.ObjectId(adminId),
                  createdAt: { $gte: dateSevenDaysAgo }
              }
          },
          {
              $group: {
                  _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                  count: { $sum: 1 }
              }
          },
          {
              $sort: { "_id": 1 }
          }
      ]);

      res.json(listingsData);
  } catch (err) {
      console.error('Error fetching total listings:', err);
      res.status(500).json({ message: 'Error fetching total listings', error: err.message });
  }
});

// Total Revenue for the Admin
router.get('/total-revenue', authenticateAdmin, async (req, res) => {
  const adminId = req.decodedToken.userId;

  try {
      let dateSevenDaysAgo = new Date();
      dateSevenDaysAgo.setDate(dateSevenDaysAgo.getDate() - 7);

      const revenueData = await Booking.aggregate([
          {
              $match: {
                  createdBy: new mongoose.Types.ObjectId(adminId),
                  dateOrdered: { $gte: dateSevenDaysAgo }
              }
          },
          {
              $group: {
                  _id: { $dateToString: { format: "%Y-%m-%d", date: "$dateOrdered" } },
                  total: { $sum: '$totalAmount' }
              }
          },
          {
              $sort: { "_id": 1 }
          }
      ]);

      res.json(revenueData);
  } catch (err) {
      res.status(500).json({ message: 'Error fetching total revenue', error: err });
  }
});

// Total Bookings for the Admin
router.get('/total-bookings', authenticateAdmin, async (req, res) => {
  const adminId = req.decodedToken.userId;

  try {
      let dateSevenDaysAgo = new Date();
      dateSevenDaysAgo.setDate(dateSevenDaysAgo.getDate() - 7);

      const bookingsData = await Booking.aggregate([
          {
              $match: {
                  createdBy: new mongoose.Types.ObjectId(adminId),
                  dateOrdered: { $gte: dateSevenDaysAgo }
              }
          },
          {
              $group: {
                  _id: { $dateToString: { format: "%Y-%m-%d", date: "$dateOrdered" } },
                  count: { $sum: 1 }
              }
          },
          {
              $sort: { "_id": 1 }
          }
      ]);

      res.json(bookingsData);
  } catch (err) {
      res.status(500).json({ message: 'Error fetching total bookings', error: err });
  }
});

// Recent Orders for the Admin
router.get('/recent-orders', authenticateAdmin, async (req, res) => {
  const adminId = req.decodedToken.userId;
    try {
        const recentOrders = await Booking.find({ createdBy: adminId }).sort({ createdAt: -1 }).limit(5);
        res.json(recentOrders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Endpoint to get all vehicle listings related to a particular admin
router.get('/listings', authenticateAdmin, async (req, res) => {
  const adminId = req.decodedToken.userId;

  try {
      const listings = await Vehicle.find({ createdBy: adminId });
      res.json(listings);
  } catch (err) {
      console.error('Error fetching listings:', err);
      res.status(500).json({ message: 'Error fetching listings', error: err.message });
  }
});


module.exports = router;




