const express = require('express');
const router = express.Router();
const { getStaff, getStaffById, createStaff, updateStaff, deleteStaff } = require('./staffController');
const { protect } = require('../../middlewares/authMiddleware');

router.route('/')
    .get(protect, getStaff)
    .post(protect, createStaff);

router.route('/:id')
    .get(protect, getStaffById)
    .put(protect, updateStaff)
    .delete(protect, deleteStaff);

module.exports = router;
