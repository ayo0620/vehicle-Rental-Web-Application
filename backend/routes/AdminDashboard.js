const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Vehicle = require('../models/vehicle');
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
    const adminId = req.decodedToken.userId; // Assuming userId is used to identify admins
    try {
        const totalListings = await Vehicle.find({ createdBy: adminId});
        totalAdminListings = totalListings.length;
        res.json({ totalAdminListings });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Total Revenue for the Admin
router.get('/total-revenue', authenticateAdmin, async (req, res) => {
    const adminId = req.decodedToken.userId; // Retrieve adminId from decoded token

    try {
        const bookings = await Booking.find({ createdBy: adminId });
        let totalRevenue = 0;
        bookings.forEach(booking => {
            totalRevenue += booking.totalAmount;
        });
        res.json({ totalRevenue });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Total Bookings for the Admin
router.get('/total-bookings', authenticateAdmin, async (req, res) => {
    const adminId = req.decodedToken.userId; // Retrieve adminId from decoded token

    try {
        const totalBookings = await Booking.countDocuments({ createdBy: adminId });
        res.json({ totalBookings });
    } catch (err) {
        res.status(500).json({ message: err.message });
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

module.exports = router;


