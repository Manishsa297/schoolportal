import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { TextField, Button, Card, CardContent, Typography, CircularProgress } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name', res.data.name);
      if (res.data.role === 'superadmin') {
        navigate('/admin-dashboard');
      } else if (res.data.role === 'teacher') {
        navigate('/teacher-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Card style={{ width: '100%', maxWidth: '450px' }} className="p-3">
        <CardContent className="p-4">
          <Typography variant="h5" component="h1" className="text-center mb-4">
            Login
          </Typography>
          {error && <Typography color="error" className="text-center mb-4">{error}</Typography>}
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </form>
          <Typography className="text-center mt-3">
            New here? <Link to="/register">Register</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;