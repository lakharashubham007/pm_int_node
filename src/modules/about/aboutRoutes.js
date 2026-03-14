const express = require('express');
const router = express.Router();
const aboutController = require('./aboutController');
const { protect, authorize } = require('../../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer config for about images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/hero/'); // Reusing hero folder or we could use 'uploads/about/'
    },
    filename: (req, file, cb) => {
        cb(null, `about_${Date.now()}_${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// Configure Multer for multiple fields
const aboutUpload = upload.fields([
    { name: 'introImage', maxCount: 1 },
    { name: 'leaderImage_0', maxCount: 1 },
    { name: 'leaderImage_1', maxCount: 1 },
    { name: 'leaderImage_2', maxCount: 1 },
    { name: 'leaderImage_3', maxCount: 1 },
    { name: 'leaderImage_4', maxCount: 1 }
]);

router.get('/', aboutController.getAboutConfig);

// Main Update (Fallback)
router.put('/', protect, authorize('admin', 'super-admin'), aboutUpload, aboutController.updateAboutConfig);

// Modular Updates
router.put('/intro', protect, authorize('admin', 'super-admin'), aboutUpload, aboutController.updateIntro);
router.put('/vision', protect, authorize('admin', 'super-admin'), upload.none(), aboutController.updateVision);
router.put('/leadership', protect, authorize('admin', 'super-admin'), aboutUpload, aboutController.updateLeadership);
router.put('/reasons', protect, authorize('admin', 'super-admin'), upload.none(), aboutController.updateReasons);

module.exports = router;

