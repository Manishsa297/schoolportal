import axios from 'axios';

const API = axios.create({
  baseURL: '/',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const login = (formData) => API.post('/auth/login', formData);

export const getTeacherDashboard = () => API.get('/dashboard/teacher-list');
export const getStudentDashboard = () => API.get('/dashboard/student-list');

export const getTeachers = () => API.get('/admin/teachers');
export const getStudents = () => API.get('/admin/students');
export const createUser = (data) => API.post('/admin/users', data);
export const getMappings = () => API.get('/admin/mappings');
export const createMapping = (data) => API.post('/admin/mapping', data);
export const updateMapping = (id, data) => API.put(`/admin/mapping/${id}`, data);
export const deleteMapping = (id) => API.delete(`/admin/mapping/${id}`);
