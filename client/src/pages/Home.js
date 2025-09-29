import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container, Box, Paper } from '@mui/material';

const Home = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Container component="main" maxWidth="md">
        <Paper elevation={3} className="p-5 text-center">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to the School Portal
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            Your one-stop solution for managing teachers and students.
          </Typography>
          <Box className="mt-5">
            <Button variant="contained" color="primary" component={Link} to="/login" size="large" className="mx-2">
              Login
            </Button>
            <Button variant="outlined" color="primary" component={Link} to="/register" size="large" className="mx-2">
              Register
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Home;