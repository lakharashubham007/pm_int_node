const Role = require('../../models/Role');
const Permission = require('../../models/Permission');

// @desc    Get all roles
// @route   GET /api/roles
// @access  Private
exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find().populate('permissionIds').populate('sidebarMenuIds');
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a role
// @route   POST /api/roles
// @access  Private
exports.createRole = async (req, res) => {
    const { name, description, permissionIds, sidebarMenuIds } = req.body;
    try {
        const role = await Role.create({
            name,
            description,
            permissionIds,
            sidebarMenuIds,
            createdBy: req.user._id
        });
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get single role
// @route   GET /api/roles/:id
// @access  Private
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id).populate('permissionIds').populate('sidebarMenuIds');
        if (role) {
            res.json(role);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update role
// @route   PUT /api/roles/:id
// @access  Private
exports.updateRole = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (role) {
            role.name = req.body.name || role.name;
            role.description = req.body.description || role.description;
            role.permissionIds = req.body.permissionIds || role.permissionIds;
            role.sidebarMenuIds = req.body.sidebarMenuIds || role.sidebarMenuIds;
            role.status = req.body.status !== undefined ? req.body.status : role.status;

            const updatedRole = await role.save();
            res.json(updatedRole);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete role
// @route   DELETE /api/roles/:id
// @access  Private
exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (role) {
            if (role.isDefault) {
                return res.status(400).json({ message: 'Default roles cannot be deleted' });
            }
            await Role.deleteOne({ _id: req.params.id });
            res.json({ message: 'Role removed' });
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
