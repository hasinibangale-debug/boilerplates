import axios from 'axios';

/**
 * API Service
 * 
 * Configured axios instance for making HTTP requests to the backend.
 * The base URL is read from VITE_API_URL environment variable.
 * 
 * Default: http://localhost:5000/api
 * 
 * Features that can be added:
 * - Automatic token injection in request headers
 * - Response interceptors for error handling
 * - Request/response logging
 * 
 * Usage Example:
 * import api from './services/api';
 * 
 * // GET request
 * const response = await api.get('/endpoint');
 * 
 * // POST request
 * const response = await api.post('/endpoint', { data });
 * 
 * // PUT request
 * const response = await api.put('/endpoint', { data });
 * 
 * // DELETE request
 * const response = await api.delete('/endpoint');
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Optional: Add token to request headers if needed
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;