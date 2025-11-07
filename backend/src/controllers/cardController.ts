import { Request, Response } from 'express';
import cardService from '../services/cardService';

class CardController {
  async createCard(req: Request, res: Response): Promise<Response> {
    try {
      const { listId } = req.params;
      const { title, description, order } = req.body;
      const userId = req.user?.id; // Assuming user is authenticated

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (!title || order === undefined) {
        return res.status(400).json({ message: 'Title and order are required' });
      }

      const listIdNum = parseInt(listId, 10);
      if (isNaN(listIdNum)) {
        return res.status(400).json({ message: 'Invalid list ID' });
      }

      const card = await cardService.createCard(title, listIdNum, order, description);
      return res.status(201).json(card);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create card', error });
    }
  }

  async updateCard(req: Request, res: Response): Promise<Response> {
    try {
      const { cardId, listId } = req.params;
      const { title, description, order } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const cardIdNum = parseInt(cardId, 10);
      const listIdNum = parseInt(listId, 10);
      if (isNaN(cardIdNum) || isNaN(listIdNum)) {
        return res.status(400).json({ message: 'Invalid IDs' });
      }

      const updatedCard = await cardService.updateCard(cardIdNum, listIdNum, title, description, order);

      if (!updatedCard) {
        return res.status(404).json({ message: 'Card not found or unauthorized' });
      }

      return res.status(200).json(updatedCard);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update card', error });
    }
  }

  async deleteCard(req: Request, res: Response): Promise<Response> {
    try {
      const { cardId, listId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const cardIdNum = parseInt(cardId, 10);
      const listIdNum = parseInt(listId, 10);
      if (isNaN(cardIdNum) || isNaN(listIdNum)) {
        return res.status(400).json({ message: 'Invalid IDs' });
      }

      const deletedCard = await cardService.deleteCard(cardIdNum, listIdNum);

      if (!deletedCard) {
        return res.status(404).json({ message: 'Card not found or unauthorized' });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete card', error });
    }
  }

  async reorderCards(req: Request, res: Response): Promise<Response> {
    try {
      const { listId } = req.params;
      const { cardUpdates } = req.body; // [{ id: number, order: number, listId: number }]
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const listIdNum = parseInt(listId, 10);
      if (isNaN(listIdNum)) {
        return res.status(400).json({ message: 'Invalid list ID' });
      }

      if (!Array.isArray(cardUpdates)) {
        return res.status(400).json({ message: 'cardUpdates must be an array' });
      }

      await cardService.reorderCards(listIdNum, cardUpdates);
      return res.status(200).json({ message: 'Cards reordered successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to reorder cards', error });
    }
  }
}

export default new CardController();
