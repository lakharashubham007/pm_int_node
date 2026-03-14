const express = require('express');
const router = express.Router();
const { getSidebarMenus, createSidebarMenu } = require('./sidebarController');
const { protect } = require('../../middlewares/authMiddleware');

router.route('/')
    .get(protect, getSidebarMenus)
    .post(protect, createSidebarMenu);

router.get('/get-menus', protect, getSidebarMenus);

module.exports = router;
