import React, { useState, useEffect } from 'react';
import { getTeachers } from '../services/api';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data } = await getTeachers();
        setTeachers(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Teachers</h2>
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

export default TeacherManagement;
