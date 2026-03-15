const express = require('express');
const router = express.Router();
const galleryController = require('./galleryController');
const { protect, authorize } = require('../../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/hero/'); // Storing in hero folder for now or we can create uploads/gallery/
    },
    filename: (req, file, cb) => {
        cb(null, `gallery_${Date.now()}_${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

router.get('/', galleryController.getGalleryItems);

router.post('/', protect, authorize('admin', 'super-admin'), upload.single('image'), galleryController.createGalleryItem);

router.put('/:id', protect, authorize('admin', 'super-admin'), upload.single('image'), galleryController.updateGalleryItem);

router.delete('/:id', protect, authorize('admin', 'super-admin'), galleryController.deleteGalleryItem);

router.patch('/:id/status', protect, authorize('admin', 'super-admin'), galleryController.toggleStatus);

module.exports = router;
