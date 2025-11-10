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
};

export default boardService;
