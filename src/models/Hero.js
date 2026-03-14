const mongoose = require('mongoose');

const heroStatSchema = new mongoose.Schema({
    label: { type: String, required: true },
    detail: { type: String, required: true },
    iconName: { type: String, required: true, default: 'Star' },
});

const heroSchema = new mongoose.Schema({
    badgeText: { type: String, default: 'Enrollment Open 2026-27' },
    headingRegular: { type: String, default: 'The Future of' },
    headingHighlighted: { type: String, default: 'Early Education' },
    headingEnd: { type: String, default: 'Powered by AI' },
    subheading: { type: String, default: "Join Dungarpur's most advanced preschool where every child's curiosity is nurtured by cutting-edge AI and expert educators." },
    applyButtonText: { type: String, default: 'APPLY NOW' },
    applyButtonLink: { type: String, default: '/admission' },
    tourButtonText: { type: String, default: 'VIEW TOUR' },
    tourVideoUrl: { type: String, default: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    stats: { 
        type: [heroStatSchema], 
        default: [
            { label: '5:1 Student Ratio', detail: 'Personalized Care', iconName: 'Star' },
            { label: 'Safety First', detail: 'CCTV Enabled', iconName: 'ShieldCheck' },
            { label: 'AI Focused', detail: 'Future Ready', iconName: 'Sparkles' }
        ]
    },
    heroImages: { type: [String], default: [] },
    floatingBadgeTitle: { type: String, default: 'Top Tier' },
    floatingBadgeSubtitle: { type: String, default: 'Preschool 2026' }
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);
