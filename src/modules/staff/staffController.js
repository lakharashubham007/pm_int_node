const Admin = require('../../models/Admin');
const Role = require('../../models/Role');

// @desc    Get all staff (admins)
// @route   GET /api/staff
// @access  Private
exports.getStaff = async (req, res) => {
    try {
        const staff = await Admin.find({ isDeleted: false }).populate('roleId');
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single staff member by ID
// @route   GET /api/staff/:id
// @access  Private
exports.getStaffById = async (req, res) => {
    try {
        const staff = await Admin.findById(req.params.id).populate('roleId');
        if (!staff || staff.isDeleted) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create staff member
// @route   POST /api/staff
// @access  Private
exports.createStaff = async (req, res) => {
    const { name, email, password, roleId } = req.body;
    try {
        const staffExists = await Admin.findOne({ email });
        if (staffExists) {
            return res.status(400).json({ message: 'Staff with this email already exists' });
        }

        const staff = await Admin.create({
            name,
            email,
            password,
            roleId
        });

        res.status(201).json({
            id: staff._id,
            name: staff.name,
            email: staff.email,
            roleId: staff.roleId
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update staff member
// @route   PUT /api/staff/:id
// @access  Private
exports.updateStaff = async (req, res) => {
    try {
        const staff = await Admin.findById(req.params.id);
        if (staff) {
            staff.name = req.body.name || staff.name;
            staff.email = req.body.email || staff.email;
            staff.roleId = req.body.roleId || staff.roleId;
            staff.status = req.body.status !== undefined ? req.body.status : staff.status;

            if (req.body.password) {
                staff.password = req.body.password;
            }

            const updatedStaff = await staff.save();
            res.json(updatedStaff);
        } else {
            res.status(404).json({ message: 'Staff member not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete staff member
// @route   DELETE /api/staff/:id
// @access  Private
exports.deleteStaff = async (req, res) => {
    try {
        const staff = await Admin.findById(req.params.id);
        if (staff) {
            staff.isDeleted = true;
            await staff.save();
            res.json({ message: 'Staff member removed' });
        } else {
            res.status(404).json({ message: 'Staff member not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
