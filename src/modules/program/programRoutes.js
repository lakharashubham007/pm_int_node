const express = require('express');
const router = express.Router();
const { getPrograms, createProgram, updateProgram, deleteProgram } = require('./programController');
const { protect } = require('../../middlewares/authMiddleware');

router.get('/', getPrograms);
router.post('/', protect, createProgram);
router.put('/:id', protect, updateProgram);
router.delete('/:id', protect, deleteProgram);

module.exports = router;
