const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    phones: {
        type: [String],
        default: []
    },
    emails: {
        type: [String],
        default: []
    },
    address: {
        type: [String],
        default: []
    },
    workingHours: {
        type: [String],
        default: []
    },
    mapEmbedUrl: {
        type: String,
        default: ''
    },
    socialLinks: [{
        platform: String,
        url: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);
