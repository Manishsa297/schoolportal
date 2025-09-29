const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const User = require('../models/User');
const Mapping = require('../models/Mapping');

// @route   GET api/admin/teachers
// @desc    Get all teachers
// @access  Private (superadmin)
router.get('/teachers', [auth, role(['superadmin'])], async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' }).select('-password');
    res.json(teachers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/students
// @desc    Get all students
// @access  Private (superadmin)
router.get('/students', [auth, role(['superadmin'])], async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/admin/mapping
// @desc    Create a new mapping
// @access  Private (superadmin)
router.post('/mapping', [auth, role(['superadmin'])], async (req, res) => {
  const { teacherId, studentIds } = req.body;

  try {
    await Mapping.deleteMany({ teacherId });

    const mappings = studentIds.map(studentId => ({ teacherId, studentId }));
    await Mapping.insertMany(mappings);

    res.json({ msg: 'Mapping updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/mapping/:id
// @desc    Update a mapping
// @access  Private (superadmin)
router.put('/mapping/:id', [auth, role(['superadmin'])], async (req, res) => {
  const { teacherId, studentId } = req.body;

  try {
    let mapping = await Mapping.findById(req.params.id);

    if (!mapping) return res.status(404).json({ msg: 'Mapping not found' });

    mapping.teacherId = teacherId;
    mapping.studentId = studentId;

    await mapping.save();

    res.json(mapping);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/admin/mapping/:id
// @desc    Delete a mapping
// @access  Private (superadmin)
router.delete('/mapping/:id', [auth, role(['superadmin'])], async (req, res) => {
  try {
    let mapping = await Mapping.findById(req.params.id);

    if (!mapping) return res.status(404).json({ msg: 'Mapping not found' });

    await mapping.remove();

    res.json({ msg: 'Mapping removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/mappings/:teacherId
// @desc    Get all students mapped to a specific teacher
// @access  Private (superadmin)
router.get('/mappings/:teacherId', [auth, role(['superadmin'])], async (req, res) => {
  try {
    const mappings = await Mapping.find({ teacherId: req.params.teacherId });
    const studentIds = mappings.map(m => m.studentId);
    res.json(studentIds);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;