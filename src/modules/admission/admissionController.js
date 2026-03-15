const Admission = require('../../models/Admission');

// @desc    Submit admission form
// @route   POST /api/admissions
// @access  Public
exports.submitAdmission = async (req, res) => {
    try {
        const admission = await Admission.create(req.body);
        res.status(201).json({ success: true, data: admission });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all admissions with pagination
// @route   GET /api/admissions
// @access  Private/Admin
exports.getAdmissions = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalCount = await Admission.countDocuments();
        const admissions = await Admission.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            success: true,
            data: admissions,
            pagination: {
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                limit
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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
            res.json({ success: true, data: updatedAdmission });
        } else {
            res.status(404).json({ success: false, message: 'Admission not found' });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
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
            res.json({ success: true, message: 'Admission removed' });
        } else {
            res.status(404).json({ success: false, message: 'Admission not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
