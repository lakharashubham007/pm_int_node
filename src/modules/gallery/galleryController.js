const Gallery = require('../../models/Gallery');
const path = require('path');
const fs = require('fs');

// @desc    Get all gallery items with pagination
// @route   GET /api/gallery
// @access  Public
exports.getGalleryItems = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;
        const category = req.query.category;
        const isAdmin = req.query.isAdmin === 'true';

        let query = {};
        if (!isAdmin) {
            query.isActive = true;
        }
        if (category && category !== 'All') {
            query.category = category;
        }

        const total = await Gallery.countDocuments(query);
        const items = await Gallery.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            items,
            total,
            page,
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create gallery item
// @route   POST /api/gallery
// @access  Private/Admin
exports.createGalleryItem = async (req, res) => {
    try {
        const { title, category, description } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const item = await Gallery.create({
            title,
            category,
            description,
            imageUrl: req.file.filename
        });

        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
exports.updateGalleryItem = async (req, res) => {
    try {
        const { title, category, description, isActive } = req.body;
        const item = await Gallery.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        const updateData = { title, category, description, isActive };
        if (req.file) {
            updateData.imageUrl = req.file.filename;
            // Optional: delete old image file
        }

        const updatedItem = await Gallery.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
exports.deleteGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        await Gallery.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Item removed" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Toggle item status
// @route   PATCH /api/gallery/:id/status
// @access  Private/Admin
exports.toggleStatus = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        item.isActive = !item.isActive;
        await item.save();
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
