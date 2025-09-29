const Mapping = require('../models/Mapping');
const User = require('../models/User');

// @desc    Get assigned students for a teacher
// @route   GET /dashboard/teacher-list
// @access  Private (Teacher)
exports.getTeacherDashboard = async (req, res, next) => {
  try {
    const mappings = await Mapping.find({ teacherId: req.user.id }).populate('studentId');
    const students = mappings.map(mapping => mapping.studentId);
    res.status(200).json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get assigned teachers for a student
// @route   GET /dashboard/student-list
// @access  Private (Student)
exports.getStudentDashboard = async (req, res, next) => {
  try {
    const mappings = await Mapping.find({ studentId: req.user.id }).populate('teacherId');
    const teachers = mappings.map(mapping => mapping.teacherId);
    res.status(200).json({ success: true, data: teachers });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
