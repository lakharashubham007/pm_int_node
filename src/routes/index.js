const express = require('express');
const router = express.Router();

const authRoutes = require('../modules/auth/authRoutes');
const admissionRoutes = require('../modules/admission/admissionRoutes');
const programRoutes = require('../modules/program/programRoutes');
const roleRoutes = require('../modules/roles/roleRoutes');
const permissionRoutes = require('../modules/permissions/permissionRoutes');
const staffRoutes = require('../modules/staff/staffRoutes');
const sidebarRoutes = require('../modules/sidebar/sidebarRoutes');
const heroRoutes = require('../modules/hero/heroRoutes');
const aboutRoutes = require('../modules/about/aboutRoutes');
const galleryRoutes = require('../modules/gallery/galleryRoutes');
const contactRoutes = require('../modules/contact/contactRoutes');
const facilityRoutes = require('../modules/facility/facilityRoutes');


router.use('/auth', authRoutes);
router.use('/admissions', admissionRoutes);
router.use('/programs', programRoutes);
router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes);
router.use('/staff', staffRoutes);
router.use('/sidebar', sidebarRoutes);
router.use('/hero', heroRoutes);
router.use('/about', aboutRoutes);
router.use('/gallery', galleryRoutes);
router.use('/contact', contactRoutes);
router.use('/facilities', facilityRoutes);


module.exports = router;
