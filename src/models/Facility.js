const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Facility', facilitySchema);
