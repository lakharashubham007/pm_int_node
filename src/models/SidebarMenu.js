const mongoose = require('mongoose');

const SubmenuSchema = new mongoose.Schema({
    title: { type: String, required: true },
    to: { type: String },
}, { _id: false });

const sidebarMenuSchema = new mongoose.Schema({
    module_id: { type: String },
    parent_module_id: { type: String, default: '-1' },
    classChange: { type: String },
    title: { type: String, required: true },
    iconStyle: { type: String },
    to: { type: String },
    module_priority: { type: Number, default: 0 },
    hasMenu: { type: Boolean, default: false },
    userType: { type: String, enum: ['admin'], default: 'admin' },
    content: [SubmenuSchema]
}, { timestamps: true });

module.exports = mongoose.model('SidebarMenu', sidebarMenuSchema);
