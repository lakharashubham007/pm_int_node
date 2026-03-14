const Admission = require('../../models/Admission');

// @desc    Submit admission form
// @route   POST /api/admissions
// @access  Public
exports.submitAdmission = async (req, res) => {
    try {
        const admission = await Admission.create(req.body);
        res.status(201).json(admission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all admissions
// @route   GET /api/admissions
// @access  Private/Admin
exports.getAdmissions = async (req, res) => {
    try {
        const admissions = await Admission.find().sort({ createdAt: -1 });
        res.json(admissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update admission status
// @route   PUT /api/admissions/:id
// @access  Private/Admin
exports.updateAdmissionStatus = async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id);
        if (admission) {
            admission.status = req.body.status || admission.status;
            const updatedAdmission = await admission.save();
            res.json(updatedAdmission);
        } else {
            res.status(404).json({ message: 'Admission not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete admission
// @route   DELETE /api/admissions/:id
// @access  Private/Admin
exports.deleteAdmission = async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id);
        if (admission) {
            await admission.deleteOne();
            res.json({ message: 'Admission removed' });
        } else {
            res.status(404).json({ message: 'Admission not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
