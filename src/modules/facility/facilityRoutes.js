const express = require('express');
const router = express.Router();
const facilityController = require('./facilityController');
const { protect, authorize } = require('../../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/facilities/');
    },
    filename: (req, file, cb) => {
        cb(null, `facility_${Date.now()}_${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

router.get('/', facilityController.getFacilities);

router.post('/', protect, authorize('admin', 'super-admin'), upload.single('image'), facilityController.createFacility);

router.put('/:id', protect, authorize('admin', 'super-admin'), upload.single('image'), facilityController.updateFacility);

router.delete('/:id', protect, authorize('admin', 'super-admin'), facilityController.deleteFacility);

module.exports = router;
