import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const authService = {
  login: async (credentials: any) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },

  getUserProfile: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  register: async (data: any) => {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  },
};

export default authService;
