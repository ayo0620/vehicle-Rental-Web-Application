const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleType: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    bookedTimeSlots: [
        {
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            }
        }
    ],
    availability: {
        type: Boolean,
        default: true
    },
    rentPerHour: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [
        { 
            user: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('vehicle', vehicleSchema);
