const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    classApplying: { type: String, required: true },
    parentName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Admission', admissionSchema);
