const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const SidebarMenu = require('./models/SidebarMenu');
const Permission = require('./models/Permission');
const Role = require('./models/Role');
const Admin = require('./models/Admin');

const seedDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in .env file');
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await SidebarMenu.deleteMany({});
        await Permission.deleteMany({});
        console.log('Cleared existing Sidebar Menus and Permissions.');

        // 1. Create Sidebar Menus (School Aligned)
        const menus = [
            { title: 'Overview', classChange: 'menu-title', module_id: 'overview', parent_module_id: '-1', hasMenu: false },
            {
                title: 'Dashboard',
                iconStyle: 'LayoutGrid',
                to: 'dashboard',
                parent_module_id: 'overview',
                hasMenu: false
            },

            { title: 'Academic Management', classChange: 'menu-title', module_id: 'academic', parent_module_id: '-1', hasMenu: false },
            {
                title: 'Programs',
                iconStyle: 'BookOpen',
                parent_module_id: 'academic',
                hasMenu: true,
                content: [
                    { title: 'Add Program', to: 'programs/add' },
                    { title: 'All Programs', to: 'programs/list' }
                ]
            },
            {
                title: 'Admissions',
                iconStyle: 'UserPlus',
                parent_module_id: 'academic',
                hasMenu: true,
                content: [
                    { title: 'New Admission', to: 'admissions/new' },
                    { title: 'Inquiries', to: 'admissions/inquiries' }
                ]
            },

            { title: 'Administration', classChange: 'menu-title', module_id: 'admin_mgmt', parent_module_id: '-1', hasMenu: false },
            {
                title: 'Staff Directory',
                iconStyle: 'Users',
                parent_module_id: 'admin_mgmt',
                hasMenu: true,
                content: [
                    { title: 'Add Staff', to: 'staff/create' },
                    { title: 'List Staff', to: 'staff/list' }
                ]
            },
            {
                title: 'Access Control',
                iconStyle: 'ShieldCheck',
                parent_module_id: 'admin_mgmt',
                hasMenu: true,
                content: [
                    { title: 'Role Management', to: 'roles/access-control' }
                ]
            },

            { title: 'Website Content', classChange: 'menu-title', module_id: 'web_mgmt', parent_module_id: '-1', hasMenu: false },
            {
                title: 'Hero Section',
                iconStyle: 'LayoutGrid',
                to: 'cms/hero',
                parent_module_id: 'web_mgmt',
                hasMenu: false
            },
            {
                title: 'Gallery',
                iconStyle: 'Image',
                to: 'cms/gallery',
                parent_module_id: 'web_mgmt',
                hasMenu: false
            },
            {
                title: 'Facilities',
                iconStyle: 'Sparkles',
                to: 'cms/facilities',
                parent_module_id: 'web_mgmt',
                hasMenu: false
            },
            {
                title: 'About Us',
                iconStyle: 'Info',
                to: 'cms/about',
                parent_module_id: 'web_mgmt',
                hasMenu: false
            },
            {
                title: 'Contact Us',
                iconStyle: 'Phone',
                to: 'cms/contact',
                parent_module_id: 'web_mgmt',
                hasMenu: false
            }
        ];

        const insertedMenus = await SidebarMenu.insertMany(menus);
        console.log('Inserted Sidebar Menus.');

        // 2. Create Permissions
        const permissionsList = [
            // Roles & Permissions
            { name: 'View Roles', key: 'VIEW_ROLES', module: 'ROLES', description: 'View list of roles' },
            { name: 'Create Role', key: 'CREATE_ROLE', module: 'ROLES', description: 'Create new access roles' },
            { name: 'Update Role', key: 'UPDATE_ROLE', module: 'ROLES', description: 'Modify existing roles' },
            { name: 'Delete Role', key: 'DELETE_ROLE', module: 'ROLES', description: 'Delete access roles' },

            // Staff Management
            { name: 'View Staff', key: 'VIEW_STAFF', module: 'STAFF', description: 'View staff directory' },
            { name: 'Add Staff', key: 'ADD_STAFF', module: 'STAFF', description: 'Add new school staff' },
            { name: 'Update Staff', key: 'UPDATE_STAFF', module: 'STAFF', description: 'Modify staff details' },
            { name: 'Delete Staff', key: 'DELETE_STAFF', module: 'STAFF', description: 'Remove staff records' },

            // Programs
            { name: 'Manage Programs', key: 'MANAGE_PROGRAMS', module: 'ACADEMIC', description: 'Full access to school programs' },
            
            // Admissions
            { name: 'Manage Admissions', key: 'MANAGE_ADMISSIONS', module: 'ACADEMIC', description: 'Full access to admission entries' }
        ];

        const insertedPermissions = await Permission.insertMany(permissionsList);
        console.log('Inserted Permissions.');

        // 3. Create Super Admin Role
        await Role.deleteMany({});
        const superAdminRole = await Role.create({
            name: 'Super Admin',
            description: 'Full system access with all school management capabilities.',
            isDefault: true,
            status: true,
            sidebarMenuIds: insertedMenus.map(m => m._id),
            permissionIds: insertedPermissions.map(p => p._id)
        });
        console.log('Created Super Admin Role.');

        // 4. Assign role to all admins
        const updateResult = await Admin.updateMany({}, { $set: { roleId: superAdminRole._id } });
        console.log(`Updated ${updateResult.modifiedCount} admin(s) to Super Admin.`);

        console.log('Seeding completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
