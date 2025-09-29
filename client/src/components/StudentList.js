import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getStudents } from '../services/api';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 250 },
];

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await getStudents();
        // The DataGrid component requires each row to have a unique id property.
        const studentsWithIds = data.data.map(student => ({ ...student, id: student._id }));
        setStudents(studentsWithIds);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={students}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default StudentList;
