const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const Mapping = require('../models/Mapping');
const User = require('../models/User');

// @route   GET api/dashboard/teacher-list
// @desc    Get assigned students for a teacher
// @access  Private (teacher)
router.get('/teacher-list', [auth, role(['teacher'])], async (req, res) => {
  try {
    const mappings = await Mapping.find({ teacherId: req.user.id }).populate('studentId', 'name email');
    const students = mappings.map(m => m.studentId);
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/dashboard/student-list
// @desc    Get assigned teachers for a student
// @access  Private (student)
router.get('/student-list', [auth, role(['student'])], async (req, res) => {
  try {
    const mappings = await Mapping.find({ studentId: req.user.id }).populate('teacherId', 'name email');
    const teachers = mappings.map(m => m.teacherId);
    res.json(teachers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;