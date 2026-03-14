const express = require('express');
const router = express.Router();
const { submitAdmission, getAdmissions, updateAdmissionStatus, deleteAdmission } = require('./admissionController');
const { protect } = require('../../middlewares/authMiddleware');

router.post('/', submitAdmission);
router.get('/', protect, getAdmissions);
router.put('/:id', protect, updateAdmissionStatus);
router.delete('/:id', protect, deleteAdmission);

module.exports = router;
