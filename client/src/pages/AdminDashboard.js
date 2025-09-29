import React, { useState, useEffect } from 'react';
import api from '../api';
import { Tabs, Tab, Box, Typography, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Container } from '@mui/material';
import MappingModal from '../components/MappingModal';

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mappingModalOpen, setMappingModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [teachersRes, studentsRes] = await Promise.all([
        api.get('/admin/teachers'),
        api.get('/admin/students')
      ]);
      setTeachers(teachersRes.data);
      setStudents(studentsRes.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleOpenMappingModal = (teacher) => {
    setSelectedTeacher(teacher);
    setMappingModalOpen(true);
  };

  const handleCloseMappingModal = () => {
    setMappingModalOpen(false);
    setSelectedTeacher(null);
    fetchData(); // Refresh data after mapping changes
  };

  if (loading) return <div className="d-flex justify-content-center align-items-center min-vh-100"><CircularProgress /></div>;
  if (error) return <Typography color="error" className="text-center mt-4">{error}</Typography>;

  return (
    <Container className="py-4">
      <Typography variant="h4" component="h1" className="mb-4">Admin Dashboard</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Teachers" />
          <Tab label="Students" />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <Box sx={{ overflowX: 'auto' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers.map(teacher => (
                  <TableRow key={teacher._id}>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleOpenMappingModal(teacher)}>Manage Students</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>
      <TabPanel value={tab} index={1}>
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
                {students.map(student => (
                  <TableRow key={student._id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>
      {selectedTeacher && (
        <MappingModal
          open={mappingModalOpen}
          onClose={handleCloseMappingModal}
          teacher={selectedTeacher}
          students={students}
        />
      )}
    </Container>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default AdminDashboard;