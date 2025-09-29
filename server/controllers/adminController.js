const User = require('../models/User');
const Mapping = require('../models/Mapping');

// @desc    Get all teachers
// @route   GET /admin/teachers
// @access  Private (Super Admin)
exports.getTeachers = async (req, res, next) => {
  try {
    const teachers = await User.find({ role: 'teacher' });
    res.status(200).json({ success: true, data: teachers });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all students
// @route   GET /admin/students
// @access  Private (Super Admin)
exports.getStudents = async (req, res, next) => {
  try {
    const students = await User.find({ role: 'student' });
    res.status(200).json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create a new user
// @route   POST /admin/users
// @access  Private (Super Admin)
exports.createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Create a new mapping
// @route   POST /admin/mapping
// @access  Private (Super Admin)
exports.createMapping = async (req, res, next) => {
  const { teacherId, studentId } = req.body;
  try {
    const mapping = await Mapping.create({ teacherId, studentId });
    res.status(201).json({ success: true, data: mapping });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update a mapping
// @route   PUT /admin/mapping/:id
// @access  Private (Super Admin)
exports.updateMapping = async (req, res, next) => {
  try {
    const mapping = await Mapping.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!mapping) {
      return res.status(404).json({ success: false, message: 'Mapping not found' });
    }
    res.status(200).json({ success: true, data: mapping });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete a mapping
// @route   DELETE /admin/mapping/:id
// @access  Private (Super Admin)
exports.deleteMapping = async (req, res, next) => {
  try {
    const mapping = await Mapping.findById(req.params.id);
    if (!mapping) {
      return res.status(404).json({ success: false, message: 'Mapping not found' });
    }
    await mapping.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all mappings
// @route   GET /admin/mappings
// @access  Private (Super Admin)
exports.getMappings = async (req, res, next) => {
    try {
        const mappings = await Mapping.find().populate('teacherId').populate('studentId');
        res.status(200).json({ success: true, data: mappings });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
