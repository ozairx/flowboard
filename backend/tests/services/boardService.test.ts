import boardService from '../../src/services/boardService';
import prismaMock from '../mocks/prisma';

describe('BoardService', () => {
  const userId = 1;

  describe('createBoard', () => {
    it('should create a new board', async () => {
      const title = 'New Board';
      const board = { id: 1, title, userId, createdAt: new Date(), updatedAt: new Date() };

      prismaMock.board.create.mockResolvedValue(board);

      const result = await boardService.createBoard(title, userId);

      expect(prismaMock.board.create).toHaveBeenCalledWith({ data: { title, userId } });
      expect(result).toEqual(board);
    });
  });

  describe('getBoards', () => {
    it('should return all boards for a user', async () => {
      const boards = [
        { id: 1, title: 'Board 1', userId, createdAt: new Date(), updatedAt: new Date() },
        { id: 2, title: 'Board 2', userId, createdAt: new Date(), updatedAt: new Date() },
      ];

      prismaMock.board.findMany.mockResolvedValue(boards);

      const result = await boardService.getBoards(userId);

      expect(prismaMock.board.findMany).toHaveBeenCalledWith({ where: { userId }, orderBy: { createdAt: 'asc' } });
      expect(result).toEqual(boards);
    });
  });

  describe('getBoardById', () => {
    it('should return a board with its lists and cards', async () => {
      const boardId = 1;
      const board = { id: boardId, title: 'Test Board', userId, lists: [], createdAt: new Date(), updatedAt: new Date() };

      prismaMock.board.findUnique.mockResolvedValue(board);

      const result = await boardService.getBoardById(boardId, userId);

      expect(prismaMock.board.findUnique).toHaveBeenCalledWith({
        where: { id: boardId, userId },
        include: {
          lists: {
            include: {
              cards: { orderBy: { order: 'asc' } },
            },
            orderBy: { order: 'asc' },
          },
        },
      });
      expect(result).toEqual(board);
    });
  });

  describe('updateBoard', () => {
    it('should update a board title', async () => {
      const boardId = 1;
      const newTitle = 'Updated Board';
      const board = { id: boardId, title: newTitle, userId, createdAt: new Date(), updatedAt: new Date() };

      prismaMock.board.update.mockResolvedValue(board);

      const result = await boardService.updateBoard(boardId, userId, newTitle);

      expect(prismaMock.board.update).toHaveBeenCalledWith({ where: { id: boardId, userId }, data: { title: newTitle } });
      expect(result).toEqual(board);
    });
  });

  describe('deleteBoard', () => {
    it('should delete a board', async () => {
      const boardId = 1;
      const board = { id: boardId, title: 'Test Board', userId, createdAt: new Date(), updatedAt: new Date() };

      prismaMock.board.delete.mockResolvedValue(board);

      const result = await boardService.deleteBoard(boardId, userId);

      expect(prismaMock.board.delete).toHaveBeenCalledWith({ where: { id: boardId, userId } });
      expect(result).toEqual(board);
    });
  });
});
