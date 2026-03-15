const express = require('express');
const router = express.Router();
const contactController = require('./contactController');
const { protect, authorize } = require('../../middlewares/authMiddleware');

router.get('/', contactController.getContact);
router.post('/', protect, authorize('admin', 'super-admin'), contactController.updateContact);

module.exports = router;
