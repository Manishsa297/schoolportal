import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Import the custom theme
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TeacherList from './pages/TeacherList';
import StudentList from './pages/StudentList';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children, roles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(userRole)) {
    // Redirect to a relevant page if role doesn't match
    const role = localStorage.getItem('role');
    let path = '/login';
    if(role === 'superadmin') path = '/admin-dashboard';
    else if(role === 'teacher') path = '/teacher-dashboard';
    else if(role === 'student') path = '/student-dashboard';
    return <Navigate to={path} />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/teacher-dashboard" element={<PrivateRoute roles={['teacher']}><TeacherList /></PrivateRoute>} />
          <Route path="/student-dashboard" element={<PrivateRoute roles={['student']}><StudentList /></PrivateRoute>} />
          <Route path="/admin-dashboard" element={<PrivateRoute roles={['superadmin']}><AdminDashboard /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;