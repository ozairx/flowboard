import prisma from '../database/client.js';
import { List } from '@prisma/client';

class ListService {
  async createList(title: string, boardId: number, order: number): Promise<List> {
    const list = await prisma.list.create({
      data: {
        title,
        boardId,
        order,
      },
    });
    return list;
  }

  async updateList(listId: number, boardId: number, title: string, order: number): Promise<List | null> {
    const list = await prisma.list.update({
      where: {
        id: listId,
        boardId,
      },
      data: {
        title,
        order,
      },
    });
    return list;
  }

  async deleteList(listId: number, boardId: number): Promise<List | null> {
    // Before deleting the list, delete all cards associated with it
    await prisma.card.deleteMany({
      where: {
        listId: listId,
      },
    });

    const list = await prisma.list.delete({
      where: {
        id: listId,
        boardId,
      },
    });
    return list;
  }

  async reorderLists(boardId: number, listUpdates: { id: number; order: number }[]): Promise<void> {
    const transaction = listUpdates.map((list) =>
      prisma.list.update({
        where: { id: list.id, boardId },
        data: { order: list.order },
      })
    );
    await prisma.$transaction(transaction);
  }
}

export default new ListService();
