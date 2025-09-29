const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Mapping = require('./models/Mapping');
require('dotenv').config();

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  await User.deleteMany({});
  await Mapping.deleteMany({});

  const superadmin = await new User({ name: 'Admin User', email: 'admin@example.com', password: 'password', role: 'superadmin' }).save();

  const teachers = await User.insertMany([
    { name: 'Alice Johnson', email: 'alice@example.com', password: 'password', role: 'teacher' },
    { name: 'Bob Smith', email: 'bob@example.com', password: 'password', role: 'teacher' }
  ]);

  const students = await User.insertMany([
    { name: 'Charlie Brown', email: 'charlie@example.com', password: 'password', role: 'student' },
    { name: 'Diana Prince', email: 'diana@example.com', password: 'password', role: 'student' },
    { name: 'Ethan Hunt', email: 'ethan@example.com', password: 'password', role: 'student' }
  ]);

  await Mapping.insertMany([
    { teacherId: teachers[0]._id, studentId: students[0]._id },
    { teacherId: teachers[0]._id, studentId: students[1]._id },
    { teacherId: teachers[1]._id, studentId: students[1]._id },
    { teacherId: teachers[1]._id, studentId: students[2]._id }
  ]);

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB();