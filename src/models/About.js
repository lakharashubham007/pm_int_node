const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    // Page Header
    headerTitle: { type: String, default: "ABOUT OUR SCHOOL" },
    headerSubtitle: { type: String, default: "Nurturing Minds, Shaping Futures" },

    // Introduction Section
    introBadge: { type: String, default: "Our Story" },
    introHeading: { type: String, default: "Pioneering Excellence in Modern Education" },
    introParagraphs: [{ type: String }],
    introStats: [
        {
            label: String,
            value: String
        }
    ],
    introImage: { type: String }, // Filename

    // Vision & Mission Section
    visionTitle: { type: String, default: "Our Vision" },
    visionDescription: { type: String },
    visionIcon: { type: String, default: "Eye" },
    
    missionTitle: { type: String, default: "Our Mission" },
    missionDescription: { type: String },
    missionIcon: { type: String, default: "Target" },

    coreValues: [
        {
            label: String,
            iconName: String
        }
    ],

    // Leadership Section
    leaders: [
        {
            name: String,
            role: String,
            message: String,
            image: String, // Filename
            reverse: { type: Boolean, default: false }
        }
    ],

    // Why Choose Us Section
    whyChooseHeading: { type: String, default: "Why Choose PM International?" },
    whyChooseSubheading: { type: String, default: "Defining the Future of Education" },
    reasons: [
        {
            title: String,
            description: String,
            iconName: String,
            color: String // optional gradient classes
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
