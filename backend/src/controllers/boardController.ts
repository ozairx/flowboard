import { Request, Response } from 'express';
import boardService from '../services/boardService';

class BoardController {
  async createBoard(req: Request, res: Response): Promise<Response> {
    try {
      const { title } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }

      const board = await boardService.createBoard(title, userId);
      return res.status(201).json(board);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create board', error });
    }
  }

  async getBoards(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const boards = await boardService.getBoards(userId);
      return res.status(200).json(boards);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch boards', error });
    }
  }

  async getBoardById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const boardId = parseInt(id, 10);
      if (isNaN(boardId)) {
        return res.status(400).json({ message: 'Invalid board ID' });
      }

      const board = await boardService.getBoardById(boardId, userId);

      if (!board) {
        return res.status(404).json({ message: 'Board not found or unauthorized' });
      }

      return res.status(200).json(board);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch board', error });
    }
  }

  async updateBoard(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const boardId = parseInt(id, 10);
      if (isNaN(boardId)) {
        return res.status(400).json({ message: 'Invalid board ID' });
      }

      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }

      const updatedBoard = await boardService.updateBoard(boardId, userId, title);

      if (!updatedBoard) {
        return res.status(404).json({ message: 'Board not found or unauthorized' });
      }

      return res.status(200).json(updatedBoard);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update board', error });
    }
  }

  async deleteBoard(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const boardId = parseInt(id, 10);
      if (isNaN(boardId)) {
        return res.status(400).json({ message: 'Invalid board ID' });
      }

      const deletedBoard = await boardService.deleteBoard(boardId, userId);

      if (!deletedBoard) {
        return res.status(404).json({ message: 'Board not found or unauthorized' });
      }

      return res.status(204).send(); // No content for successful deletion
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete board', error });
    }
  }
}

export default new BoardController();
