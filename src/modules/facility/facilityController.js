const Facility = require('../../models/Facility');

exports.getFacilities = async (req, res) => {
    try {
        const facilities = await Facility.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: facilities });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createFacility = async (req, res) => {
    try {
        console.log('--- Create Facility Request ---');
        console.log('Body:', req.body);
        console.log('File:', req.file);

        if (!req.file && !req.body.image) {
            return res.status(400).json({ success: false, message: 'Facility image is required' });
        }

        const facilityData = {
            ...req.body,
            image: req.file ? req.file.filename : req.body.image
        };

        const facility = await Facility.create(facilityData);
        res.status(201).json({ success: true, data: facility });
    } catch (error) {
        console.error('Create Facility Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateFacility = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = req.file.filename;
        }

        const facility = await Facility.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json({ success: true, data: facility });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteFacility = async (req, res) => {
    try {
        await Facility.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Facility deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
