const express = require('express');
const router = express.Router();
const { getPermissions, createPermission } = require('./permissionController');
const { protect } = require('../../middlewares/authMiddleware');

router.route('/')
    .get(protect, getPermissions)
    .post(protect, createPermission);

module.exports = router;
