import React, { useState, useEffect } from 'react';
import api from '../api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, TextField, Container, Box } from '@mui/material';

const StudentList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await api.get('/dashboard/student-list');
        setTeachers(res.data);
      } catch (err) {
        setError('Failed to fetch teachers');
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const filteredTeachers = teachers
    .filter(teacher => teacher) // Add this line to prevent crash if a teacher is null
    .filter(teacher =>
      teacher.name.toLowerCase().includes(search.toLowerCase()) ||
      teacher.email.toLowerCase().includes(search.toLowerCase())
    );

  if (loading) return <div className="d-flex justify-content-center align-items-center min-vh-100"><CircularProgress /></div>;
  if (error) return <Typography color="error" className="text-center mt-4">{error}</Typography>;

  return (
    <Container className="py-4">
      <Typography variant="h4" component="h1" className="mb-4">Assigned Teachers</Typography>
      <TextField
        label="Search Teachers"
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
              {filteredTeachers.map(teacher => (
                <TableRow key={teacher._id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default StudentList;