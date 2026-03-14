const Program = require('../../models/Program');

// @desc    Get all programs
// @route   GET /api/programs
// @access  Public
exports.getPrograms = async (req, res) => {
    try {
        const programs = await Program.find();
        res.json(programs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a program
// @route   POST /api/programs
// @access  Private/Admin
exports.createProgram = async (req, res) => {
    try {
        const program = await Program.create(req.body);
        res.status(201).json(program);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a program
// @route   PUT /api/programs/:id
// @access  Private/Admin
exports.updateProgram = async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        if (program) {
            Object.assign(program, req.body);
            const updatedProgram = await program.save();
            res.json(updatedProgram);
        } else {
            res.status(404).json({ message: 'Program not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a program
// @route   DELETE /api/programs/:id
// @access  Private/Admin
exports.deleteProgram = async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        if (program) {
            await program.deleteOne();
            res.json({ message: 'Program removed' });
        } else {
            res.status(404).json({ message: 'Program not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
