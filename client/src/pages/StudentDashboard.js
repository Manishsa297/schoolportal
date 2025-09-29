import React, { useState, useEffect } from 'react';
import { getStudentDashboard } from '../services/api';

const StudentDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data } = await getStudentDashboard();
        setTeachers(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeachers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Student Dashboard</h1>
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
          {filteredTeachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
