import React, { useState, useEffect } from 'react';
import { getTeachers, getStudents, getMappings, createMapping, deleteMapping } from '../services/api';

const MappingManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [teachersRes, studentsRes, mappingsRes] = await Promise.all([
        getTeachers(),
        getStudents(),
        getMappings(),
      ]);
      setTeachers(teachersRes.data.data);
      setStudents(studentsRes.data.data);
      setMappings(mappingsRes.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateMapping = async (e) => {
    e.preventDefault();
    if (!selectedTeacher || !selectedStudent) {
      alert('Please select a teacher and a student');
      return;
    }
    try {
      await createMapping({ teacherId: selectedTeacher, studentId: selectedStudent });
      fetchData();
      setSelectedTeacher('');
      setSelectedStudent('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMapping = async (id) => {
    try {
      await deleteMapping(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Mapping Management</h2>
      <form onSubmit={handleCreateMapping}>
        <div className="form-group">
          <label>Teacher</label>
          <select
            className="form-control"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Student</label>
          <select
            className="form-control"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Assign</button>
      </form>

      <table className="table" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Student</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mappings.map((mapping) => (
            <tr key={mapping._id}>
              <td>{mapping.teacherId.name}</td>
              <td>{mapping.studentId.name}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteMapping(mapping._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MappingManagement;
