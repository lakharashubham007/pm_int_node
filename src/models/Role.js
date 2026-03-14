const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    permissionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
    sidebarMenuIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SidebarMenu' }],
    isDefault: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);
