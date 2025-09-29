import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { getMappings, deleteMapping } from '../services/api';

const MappingList = () => {
  const [mappings, setMappings] = useState([]);

  const fetchMappings = async () => {
    try {
      const { data } = await getMappings();
      const mappingsWithIds = data.data.map(mapping => ({ ...mapping, id: mapping._id }));
      setMappings(mappingsWithIds);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMappings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMapping(id);
      fetchMappings(); // Refresh the list
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: 'teacherName', headerName: 'Teacher', width: 200, valueGetter: (params) => params.row.teacherId.name },
    { field: 'studentName', headerName: 'Student', width: 200, valueGetter: (params) => params.row.studentId.name },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleDelete(params.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
        <Button variant="contained" sx={{ mb: 2 }}>
            Create Mapping
        </Button>
      <DataGrid
        rows={mappings}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default MappingList;
