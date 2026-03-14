const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ageGroup: { type: String, required: true },
    description: { type: String, required: true },
    curriculum: { type: [String], default: [] },
    images: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Program', programSchema);
