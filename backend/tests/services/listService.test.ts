import listService from '../../src/services/listService';
import prismaMock from '../mocks/prisma';

describe('ListService', () => {
  const boardId = 1;

  describe('createList', () => {
    it('should create a new list', async () => {
      const listData = { title: 'New List', boardId, order: 0 };
      const list = { id: 1, ...listData, createdAt: new Date(), updatedAt: new Date() };

      prismaMock.list.create.mockResolvedValue(list);

      const result = await listService.createList(listData.title, listData.boardId, listData.order);

      expect(prismaMock.list.create).toHaveBeenCalledWith({ data: listData });
      expect(result).toEqual(list);
    });
  });

  describe('updateList', () => {
    it('should update a list', async () => {
      const listId = 1;
      const updatedData = { title: 'Updated List', order: 1 };
      const list = { id: listId, boardId, ...updatedData, createdAt: new Date(), updatedAt: new Date() };

      prismaMock.list.update.mockResolvedValue(list);

      const result = await listService.updateList(listId, boardId, updatedData.title, updatedData.order);

      expect(prismaMock.list.update).toHaveBeenCalledWith({ where: { id: listId, boardId }, data: updatedData });
      expect(result).toEqual(list);
    });
  });

  describe('deleteList', () => {
    it('should delete a list and its cards', async () => {
      const listId = 1;
      const list = { id: listId, title: 'Test List', boardId, order: 0, createdAt: new Date(), updatedAt: new Date() };

      prismaMock.card.deleteMany.mockResolvedValue({ count: 2 });
      prismaMock.list.delete.mockResolvedValue(list);

      const result = await listService.deleteList(listId, boardId);

      expect(prismaMock.card.deleteMany).toHaveBeenCalledWith({ where: { listId } });
      expect(prismaMock.list.delete).toHaveBeenCalledWith({ where: { id: listId, boardId } });
      expect(result).toEqual(list);
    });
  });

  describe('reorderLists', () => {
    it('should reorder lists in a transaction', async () => {
      const listUpdates = [{ id: 1, order: 1 }, { id: 2, order: 0 }];

      prismaMock.$transaction.mockResolvedValue([]);

      await listService.reorderLists(boardId, listUpdates);

      expect(prismaMock.$transaction).toHaveBeenCalled();
    });
  });
});
