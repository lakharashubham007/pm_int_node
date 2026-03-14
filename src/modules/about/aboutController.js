const About = require('../../models/About');

// @desc    Get about section configuration
// @route   GET /api/about
// @access  Public
exports.getAboutConfig = async (req, res) => {
    try {
        let about = await About.findOne();
        if (!about) {
            // Initialize with empty doc if not exists
            about = await About.create({});
        }
        res.status(200).json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update about section configuration
// @route   PUT /api/about
// @access  Private/Admin
exports.updateAboutConfig = async (req, res) => {
    try {
        const updateData = { ...req.body };

        // Handle stringified JSON fields from FormData
        const jsonFields = ['introParagraphs', 'introStats', 'coreValues', 'leaders', 'reasons'];
        jsonFields.forEach(field => {
            if (updateData[field]) {
                try {
                    updateData[field] = JSON.parse(updateData[field]);
                } catch (e) {
                    console.error(`Error parsing JSON for ${field}:`, e);
                }
            }
        });

        // Handle File Uploads
        if (req.files) {
            // Intro Image
            if (req.files.introImage) {
                updateData.introImage = req.files.introImage[0].filename;
            }

            // Leader Images (Matching by index or replacing existing)
            // Note: Complex logic for specific leader images if handled via unified upload.
            // Simplified: If leaders were sent with specific file keys like 'leader_0', 'leader_1'
            if (updateData.leaders && Array.isArray(updateData.leaders)) {
                updateData.leaders.forEach((leader, index) => {
                    const fileKey = `leaderImage_${index}`;
                    if (req.files[fileKey]) {
                        leader.image = req.files[fileKey][0].filename;
                    }
                });
            }
        }

        const about = await About.findOneAndUpdate({}, updateData, {
            new: true,
            upsert: true,
            runValidators: true
        });

        res.status(200).json(about);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update Intro Section
// @route   PUT /api/about/intro
exports.updateIntro = async (req, res) => {
    try {
        const { headerTitle, headerSubtitle, introBadge, introHeading, introParagraphs, introStats } = req.body;
        const updateData = { headerTitle, headerSubtitle, introBadge, introHeading };

        if (introParagraphs) updateData.introParagraphs = JSON.parse(introParagraphs);
        if (introStats) updateData.introStats = JSON.parse(introStats);

        if (req.files && req.files.introImage) {
            updateData.introImage = req.files.introImage[0].filename;
        }

        const about = await About.findOneAndUpdate({}, updateData, { new: true, upsert: true });
        res.status(200).json(about);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update Vision & Mission Section
// @route   PUT /api/about/vision
exports.updateVision = async (req, res) => {
    try {
        const { visionTitle, visionDescription, visionIcon, missionTitle, missionDescription, missionIcon } = req.body;
        const updateData = { visionTitle, visionDescription, visionIcon, missionTitle, missionDescription, missionIcon };

        const about = await About.findOneAndUpdate({}, updateData, { new: true, upsert: true });
        res.status(200).json(about);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update Leadership Section
// @route   PUT /api/about/leadership
exports.updateLeadership = async (req, res) => {
    try {
        let { leaders } = req.body;
        if (!leaders) return res.status(400).json({ message: "Leaders data required" });
        
        leaders = JSON.parse(leaders);

        if (req.files) {
            leaders.forEach((leader, index) => {
                const fileKey = `leaderImage_${index}`;
                if (req.files[fileKey]) {
                    leader.image = req.files[fileKey][0].filename;
                }
            });
        }

        const about = await About.findOneAndUpdate({}, { leaders }, { new: true, upsert: true });
        res.status(200).json(about);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update Reasons Section
// @route   PUT /api/about/reasons
exports.updateReasons = async (req, res) => {
    try {
        const { whyChooseHeading, whyChooseSubheading, reasons } = req.body;
        const updateData = { whyChooseHeading, whyChooseSubheading };

        if (reasons) updateData.reasons = JSON.parse(reasons);

        const about = await About.findOneAndUpdate({}, updateData, { new: true, upsert: true });
        res.status(200).json(about);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
