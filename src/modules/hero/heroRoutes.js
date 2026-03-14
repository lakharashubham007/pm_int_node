const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getHeroConfig, updateHeroConfig } = require('./heroController');
const { protect } = require('../../middlewares/authMiddleware');

// Multer config for hero images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/hero/');
    },
    filename: (req, file, cb) => {
        cb(null, `hero_${Date.now()}_${Math.random().toString(36).substring(7)}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per image
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);
        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Public GET
router.get('/', getHeroConfig);

// Protected PUT (Admin only) - allows max 10 images uploaded at once
router.put('/', protect, upload.array('newImages', 10), updateHeroConfig);

module.exports = router;
