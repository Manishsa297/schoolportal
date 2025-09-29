import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getTeachers } from '../services/api';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 250 },
];

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data } = await getTeachers();
        // The DataGrid component requires each row to have a unique id property.
        const teachersWithIds = data.data.map(teacher => ({ ...teacher, id: teacher._id }));
        setTeachers(teachersWithIds);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={teachers}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default TeacherList;
