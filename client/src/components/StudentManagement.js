import React, { useState, useEffect } from 'react';
import { getStudents } from '../services/api';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await getStudents();
        setStudents(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Students</h2>
      <input
        type="text"
        placeholder="Search by name or email..."
        className="form-control"
        style={{ marginTop: 20, marginBottom: 20 }}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManagement;
