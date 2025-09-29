import React, { useState, useEffect } from 'react';
import { getTeacherDashboard } from '../services/api';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await getTeacherDashboard();
        setStudents(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Teacher Dashboard</h1>
      <button onClick={handleLogout} className="btn btn-danger">Logout</button>
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

export default TeacherDashboard;
