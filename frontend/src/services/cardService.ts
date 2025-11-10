import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const cardService = {
  reorderCards: async (boardId: string, listId: string, cards: any[]) => {
    const token = useAuthStore.getState().token;
    const response = await axios.patch(`${API_URL}/boards/${boardId}/lists/${listId}/cards/reorder`, { cards }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default cardService;
