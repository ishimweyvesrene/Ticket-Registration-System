import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Ticket API endpoints
export const ticketAPI = {
  // Get all tickets
  getAll: () => api.get('/tickets/'),
  
  // Get single ticket by id
  getById: (id) => api.get(`/tickets/${id}/`),
  
  // Create new ticket
  create: (ticketData) => api.post('/tickets/', ticketData),
  
  // Update ticket
  update: (id, ticketData) => api.put(`/tickets/${id}/`, ticketData),
  
  // Delete ticket
  delete: (id) => api.delete(`/tickets/${id}/`),
};

export default api;