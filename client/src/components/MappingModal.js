import React, { useState, useEffect } from 'react';
import api from '../api';
import { Modal, Box, Typography, Button, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';

const MappingModal = ({ open, onClose, teacher, students }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (teacher) {
      setLoading(true);
      api.get(`/admin/mappings/${teacher._id}`)
        .then(res => {
          setSelectedStudents(res.data);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [teacher]);

  const handleStudentChange = (event) => {
    setSelectedStudents(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post('/admin/mapping', { teacherId: teacher._id, studentIds: selectedStudents });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, width: { xs: '90%', sm: 400 } }}>
        <Typography variant="h6" component="h2">Manage Students for {teacher?.name}</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Students</InputLabel>
          <Select
            multiple
            value={selectedStudents}
            onChange={handleStudentChange}
            renderValue={(selected) => students.filter(s => selected.includes(s._id)).map(s => s.name).join(', ')}
          >
            {students.map(student => (
              <MenuItem key={student._id} value={student._id}>
                {student.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default MappingModal;