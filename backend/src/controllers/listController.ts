import { Request, Response } from 'express';
import listService from '../services/listService';

import fs from 'fs';
// ... other imports

class ListController {
  async createList(req: Request, res: Response): Promise<Response> {
    try {
      const { boardId } = req.params;
      const { title, order } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (!title || order === undefined) {
        return res.status(400).json({ message: 'Title and order are required' });
      }

      const boardIdNum = parseInt(boardId, 10);
      if (isNaN(boardIdNum)) {
        return res.status(400).json({ message: 'Invalid board ID' });
      }

      const list = await listService.createList(title, boardIdNum, order);
      return res.status(201).json(list);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create list', error });
    }
  }

  async updateList(req: Request, res: Response): Promise<Response> {
    try {
      const { listId, boardId } = req.params;
      const { title, order } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const listIdNum = parseInt(listId, 10);
      const boardIdNum = parseInt(boardId, 10);
      if (isNaN(listIdNum) || isNaN(boardIdNum)) {
        return res.status(400).json({ message: 'Invalid IDs' });
      }

      if (!title || order === undefined) {
        return res.status(400).json({ message: 'Title and order are required' });
      }

      const updatedList = await listService.updateList(listIdNum, boardIdNum, title, order);

      if (!updatedList) {
        return res.status(404).json({ message: 'List not found or unauthorized' });
      }

      return res.status(200).json(updatedList);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update list', error });
    }
  }

  async deleteList(req: Request, res: Response): Promise<Response> {
    try {
      const { listId, boardId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const listIdNum = parseInt(listId, 10);
      const boardIdNum = parseInt(boardId, 10);
      if (isNaN(listIdNum) || isNaN(boardIdNum)) {
        return res.status(400).json({ message: 'Invalid IDs' });
      }

      const deletedList = await listService.deleteList(listIdNum, boardIdNum);

      if (!deletedList) {
        return res.status(404).json({ message: 'List not found or unauthorized' });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete list', error });
    }
  }

  async reorderLists(req: Request, res: Response): Promise<Response> {
    try {
      const { boardId } = req.params;
      const { listUpdates } = req.body; // [{ id: number, order: number }]
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const boardIdNum = parseInt(boardId, 10);
      if (isNaN(boardIdNum)) {
        return res.status(400).json({ message: 'Invalid board ID' });
      }

      if (!Array.isArray(listUpdates)) {
        return res.status(400).json({ message: 'listUpdates must be an array' });
      }

      await listService.reorderLists(boardIdNum, listUpdates);
      return res.status(200).json({ message: 'Lists reordered successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to reorder lists', error });
    }
  }
}

export default new ListController();
