const Contact = require('../../models/Contact');

// @desc    Get contact info
// @route   GET /api/contact
// @access  Public
exports.getContact = async (req, res) => {
    try {
        let contact = await Contact.findOne();
        if (!contact) {
            // Return default empty structure if nothing seeded yet
            return res.status(200).json({
                phones: [],
                emails: [],
                address: [],
                workingHours: [],
                mapEmbedUrl: '',
                socialLinks: []
            });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update or create contact info
// @route   POST /api/contact
// @access  Private/Admin
exports.updateContact = async (req, res) => {
    try {
        const { phones, emails, address, workingHours, mapEmbedUrl, socialLinks } = req.body;
        
        let contact = await Contact.findOne();

        if (contact) {
            contact.phones = phones;
            contact.emails = emails;
            contact.address = address;
            contact.workingHours = workingHours;
            contact.mapEmbedUrl = mapEmbedUrl;
            contact.socialLinks = socialLinks;
            await contact.save();
        } else {
            contact = await Contact.create({
                phones,
                emails,
                address,
                workingHours,
                mapEmbedUrl,
                socialLinks
            });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
