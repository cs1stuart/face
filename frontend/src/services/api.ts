import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const registerFace = (name: string, email: string, faceDescriptor: number[]) => 
  api.post('/register-face', { name, email, faceDescriptor });

export const verifyFace = (faceDescriptor: number[]) => 
  api.post('/verify-face', { faceDescriptor });

export const getUsers = () => api.get('/users');

export default api;
