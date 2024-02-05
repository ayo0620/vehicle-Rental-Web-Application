const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const Vehicle = require('../models/vehicle')


const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      // Add the decoded token to the request for further use
      req.decodedToken = decodedToken;
      next();
    });
  };

// Use the middleware for routes that require authentication
router.get('/', authenticateUser, async (req, res) => {
    try {
      const vehicles = await Vehicle.find();
      res.json(vehicles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});


// Getting all Vehciles
router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehicle.find()
        res.json(vehicles)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
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


// Filtering
router.get('/filter', async (req, res) => {
    try {
        // Extract filter parameters from the query string
        const { vehicleTypes, brands, priceRange } = req.query;

        console.log('Filter Values:', { vehicleTypes, brands, priceRange });

        // Build the filter object based on the provided parameters
        let filter = {};
        if (vehicleTypes) {
            filter.vehicleType = { $in: vehicleTypes.split(',') } ;
        }
        if (brands) {
            // Assuming brands is an array of brand names
            filter.make = { $in: brands.split(',') };
    }
        if (priceRange) {
        // Assuming priceRange is an array [minPrice, maxPrice]
        const [minPrice, maxPrice] = priceRange.split(',').map(Number);
        filter.rentPerHour = { $gte: minPrice, $lte: maxPrice };
    }

    console.log('Filter Object:', filter);


        // Fetch vehicles based on the filter
        const filteredVehicles = await Vehicle.find(filter);

        res.json(filteredVehicles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

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

// Getting by id
router.get('/:id', getVehicle, (req, res) => {
    res.json(res.vehicle);
  });


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