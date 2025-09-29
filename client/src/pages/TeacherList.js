import React, { useState, useEffect } from 'react';
import api from '../api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, TextField, Container, Box } from '@mui/material';

const TeacherList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get('/dashboard/teacher-list');
        setStudents(res.data);
      } catch (err) {
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students
    .filter(student => student) // Add this line to prevent crash if a student is null
    .filter(student =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
    );

  if (loading) return <div className="d-flex justify-content-center align-items-center min-vh-100"><CircularProgress /></div>;
  if (error) return <Typography color="error" className="text-center mt-4">{error}</Typography>;

  return (
    <Container className="py-4">
      <Typography variant="h4" component="h1" className="mb-4">Assigned Students</Typography>
      <TextField
        label="Search Students"
        variant="outlined"
        fullWidth
        className="mb-4"
        onChange={e => setSearch(e.target.value)}
      />
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map(student => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default TeacherList;