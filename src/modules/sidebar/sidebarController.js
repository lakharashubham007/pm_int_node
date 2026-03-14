const SidebarMenu = require('../../models/SidebarMenu');

// @desc    Get all sidebar menus
// @route   GET /api/sidebar
// @access  Private
exports.getSidebarMenus = async (req, res) => {
    try {
        const userType = req.user.userType || 'admin';
        const menus = await SidebarMenu.find({ userType }).sort('module_priority');
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a sidebar menu
// @route   POST /api/sidebar
// @access  Private
exports.createSidebarMenu = async (req, res) => {
    try {
        const menu = await SidebarMenu.create(req.body);
        res.status(201).json(menu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
