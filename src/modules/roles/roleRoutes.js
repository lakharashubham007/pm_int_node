const express = require('express');
const router = express.Router();
const { getRoles, createRole, getRoleById, updateRole, deleteRole } = require('./roleController');
const { protect } = require('../../middlewares/authMiddleware');

router.route('/')
    .get(protect, getRoles)
    .post(protect, createRole);

router.route('/:id')
    .get(protect, getRoleById)
    .put(protect, updateRole)
    .delete(protect, deleteRole);

module.exports = router;
