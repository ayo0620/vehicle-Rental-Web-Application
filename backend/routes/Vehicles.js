const express = require('express')
const router = express.Router()
const Vehicle = require('../models/vehicle')


// Getting all Vehciles
router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehicle.find()
        res.json(vehicles)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Getting One
router.get('/:id', getVehicle, (req, res) => {
    res.json(res.vehicle)
})

// Creating
router.post('/', async (req, res) => {
    const vehicle = new Vehicle({
        vehicleType: req.body.vehicleType,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        image: req.body.image,
        capacity: req.body.capacity,
        fuelType: req.body.fuelType,
        bookedTimeSlots: req.body.bookedTimeSlots,
        availability: req.body.availability,
        rentPerHour: req.body.rentPerHour
    })
    try {
        const newVehicle = await vehicle.save()
        res.status(201).json(newVehicle)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Updating 
router.patch('/:id', getVehicle, async (req, res) => {
    if(req.body.vehicleType != null) {
        res.vehicle.vehicleType = req.body.vehicleType
    }
    if(req.body.make != null) {
        res.vehicle.make = req.body.make
    }
    if(req.body.model != null) {
        res.vehicle.model = req.body.model
    }
    if(req.body.year != null) {
        res.vehicle.year = req.body.year
    }
    if(req.body.image != null) {
        res.vehicle.image = req.body.image
    }
    if(req.body.capacity != null) {
        res.vehicle.capacity = req.body.capacity
    }
    if(req.body.fuelType != null) {
        res.vehicle.fuelType = req.body.fuelType
    }
    if(req.body.bookedTimeSlots != null) {
        res.vehicle.bookedTimeSlots = req.body.bookedTimeSlots
    }
    if(req.body.availability != null) {
        res.vehicle.availability = req.body.availability
    }
    if(req.body.rentPerHour != null) {
        res.vehicle.rentPerHour = req.body.rentPerHour
    }
    try {
        const updatedVehicle = await res.vehicle.save()
        res.json(updatedVehicle)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

// Deleting
router.delete('/:id', getVehicle, async (req, res) => {
    try {
        await res.vehicle.deleteOne();
        res.json({ message: 'Deleted Vehicle'})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getVehicle(req, res, next) {
    let vehicle;

    try {
        vehicle = await Vehicle.findById(req.params.id)
        if (vehicle == null) {
            return res.status(404).json({ message: 'cannot find vehicle'})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }

    res.vehicle = vehicle;
    next();
}


module.exports = router