const Hero = require('../../models/Hero');
const path = require('path');
const fs = require('fs');

// @desc    Get Hero settings
// @route   GET /api/hero
// @access  Public
exports.getHeroConfig = async (req, res) => {
    try {
        let hero = await Hero.findOne();
        
        // Return default structure if nothing exists yet
        if (!hero) {
            hero = await Hero.create({});
        }
        res.json(hero);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Hero settings (handles text and multi-image upload)
// @route   PUT /api/hero
// @access  Private (Admin only)
exports.updateHeroConfig = async (req, res) => {
    try {
        let hero = await Hero.findOne();
        if (!hero) {
            hero = new Hero();
        }

        // 1. Update text fields
        const fields = [
            'badgeText', 'headingRegular', 'headingHighlighted', 'headingEnd',
            'subheading', 'applyButtonText', 'applyButtonLink', 'tourButtonText',
            'tourVideoUrl', 'floatingBadgeTitle', 'floatingBadgeSubtitle'
        ];

        fields.forEach(field => {
            if (req.body[field] !== undefined) {
                hero[field] = req.body[field];
            }
        });

        // 2. Parse stats array (comes as stringified JSON if multipart/form-data)
        if (req.body.stats) {
            try {
                hero.stats = typeof req.body.stats === 'string' ? JSON.parse(req.body.stats) : req.body.stats;
            } catch (e) {
                return res.status(400).json({ message: 'Invalid stats format' });
            }
        }

        // 3. Handle image uploads
        
        // Get list of existing images the user wants to keep (sent as array of filenames/URLs)
        let retainedImages = [];
        if (req.body.existingImages) {
             retainedImages = Array.isArray(req.body.existingImages) 
                ? req.body.existingImages 
                : [req.body.existingImages];
             
             // Extract just the filename if full URLs were sent back
             retainedImages = retainedImages.map(img => {
                 const parts = img.split('/');
                 return parts[parts.length - 1];
             });
        }

        // Add newly uploaded files
        const newImages = req.files ? req.files.map(file => file.filename) : [];
        
        // Combine retained and new
        hero.heroImages = [...retainedImages, ...newImages];

        await hero.save();
        res.json(hero);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
