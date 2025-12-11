import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const boardService = {
  getBoards: async () => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${API_URL}/boards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getBoardById: async (id: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${API_URL}/boards/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  updateBoard: async (id: string, data: { title: string }) => {
    const token = useAuthStore.getState().token;
    const response = await axios.patch(`${API_URL}/boards/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  createBoard: async (data: { title: string }) => {
    const token = useAuthStore.getState().token;
    const response = await axios.post(`${API_URL}/boards`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  deleteBoard: async (id: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.delete(`${API_URL}/boards/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default boardService;
