import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { TextField, Button, Card, CardContent, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, email, password, role } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', formData);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Card style={{ width: '100%', maxWidth: '450px' }} className="p-3">
        <CardContent className="p-4">
          <Typography variant="h5" component="h1" className="text-center mb-4">
            Register
          </Typography>
          {error && <Typography color="error" className="text-center mb-4">{error}</Typography>}
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <TextField label="Name" name="name" value={name} onChange={onChange} fullWidth required />
            </div>
            <div className="mb-3">
              <TextField label="Email" name="email" type="email" value={email} onChange={onChange} fullWidth required />
            </div>
            <div className="mb-3">
              <TextField label="Password" name="password" type="password" value={password} onChange={onChange} fullWidth required />
            </div>
            <div className="mb-3">
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select name="role" value={role} onChange={onChange} label="Role">
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
          </form>
          <Typography className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;