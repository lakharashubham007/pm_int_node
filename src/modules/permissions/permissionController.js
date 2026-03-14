const Permission = require('../../models/Permission');

// @desc    Get all permissions
// @route   GET /api/permissions
// @access  Private
exports.getPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a permission
// @route   POST /api/permissions
// @access  Private
exports.createPermission = async (req, res) => {
    const { name, key, module, description } = req.body;
    try {
        const permission = await Permission.create({ name, key, module, description });
        res.status(201).json(permission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
