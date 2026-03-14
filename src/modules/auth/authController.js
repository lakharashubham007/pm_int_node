const Admin = require('../../models/Admin');
const Role = require('../../models/Role');
const Permission = require('../../models/Permission');
const SidebarMenu = require('../../models/SidebarMenu');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d'
    });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Find admin and populate role with permissions
    const admin = await Admin.findOne({ email }).populate({
        path: 'roleId',
        populate: { path: 'permissionIds' }
    });

    if (admin && (await admin.matchPassword(password))) {
        // Map permissions to a flat array of keys
        const permissions = admin.roleId?.permissionIds?.map(p => p.key) || [];

        res.json({
            token: generateToken(admin._id),
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.roleId?.name,
                profileImage: admin.profileImage,
                permissions
            }
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    const admin = await Admin.findById(req.user._id).populate({
        path: 'roleId',
        populate: [
            { path: 'permissionIds' },
            { path: 'sidebarMenuIds' }
        ]
    });

    if (admin) {
        const permissions = admin.roleId?.permissionIds?.map(p => p.key) || [];
        const sidebarMenus = admin.roleId?.sidebarMenuIds || [];

        res.json({
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.roleId?.name,
            profileImage: admin.profileImage,
            permissions,
            sidebarMenus
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update profile (name, email, profile image)
// @route   PUT /api/auth/update-profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user._id);
        if (!admin) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.body.name) admin.name = req.body.name;
        if (req.body.email) admin.email = req.body.email;

        // Handle profile image upload (multipart)
        if (req.file) {
            admin.profileImage = req.file.filename || req.file.path;
        }

        const updatedAdmin = await admin.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: updatedAdmin._id,
                name: updatedAdmin.name,
                email: updatedAdmin.email,
                role: admin.roleId,
                profileImage: updatedAdmin.profileImage
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current and new password are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters' });
        }

        const admin = await Admin.findById(req.user._id);
        if (!admin) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await admin.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        admin.password = newPassword; // pre-save hook will hash it
        await admin.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
