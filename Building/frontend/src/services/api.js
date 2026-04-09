import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

export const authAPI = {
  login:    (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  logout:   ()     => api.post('/auth/logout'),
  me:       ()     => api.get('/auth/me'),
};
export const dashboardAPI  = { get: () => api.get('/dashboard') };
export const applicationsAPI = {
  getAll: () => api.get('/applications'),
  create: (data) => api.post('/applications', data),
  patch:  (id, data) => api.patch(`/applications/${id}`, data),
  delete: (id) => api.delete(`/applications/${id}`),
};
export const companiesAPI = {
  getAll: () => api.get('/companies'),
  create: (data) => api.post('/companies', data),
  patch:  (id, data) => api.patch(`/companies/${id}`, data),
  delete: (id) => api.delete(`/companies/${id}`),
};
export const columnsAPI = {
  get:          (page)                => api.get(`/columns/${page}`),
  put:          (page, columns)       => api.put(`/columns/${page}`, { columns }),
  patchOptions: (page, colId, options)=> api.patch(`/columns/${page}/${colId}/options`, { options }),
};
export const documentsAPI = {
  getAll: () => api.get('/documents'),
  upload: (fd) => api.post('/documents', fd, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/documents/${id}`),
};
export const profileAPI = {
  get:            () => api.get('/profile'),
  update:         (fd) => api.put('/profile', fd, { headers: { 'Content-Type': 'multipart/form-data' } }),
  changePassword: (data) => api.put('/profile/password', data),
};
export const analyticsAPI = { get: () => api.get('/analytics') };
export const adminAPI = {
  getDashboard: () => api.get('/admin'),
  getUsers:     () => api.get('/admin/users'),
  updateRole:   (id, role) => api.put(`/admin/users/${id}/role`, { role }),
  deleteUser:   (id) => api.delete(`/admin/users/${id}`),
};
const API = import.meta.env.VITE_API_URL;

export default API;

