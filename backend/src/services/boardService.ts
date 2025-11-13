import prisma from "../database/client";
import { Board, User } from "@prisma/client";

class BoardService {
  async createBoard(title: string, userId: number): Promise<Board> {
    const board = await prisma.board.create({
      data: {
        title,
        userId,
      },
    });
    return board;
  }

  async getBoards(userId: number): Promise<Board[]> {
    const boards = await prisma.board.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return boards;
  }

  async getBoardById(boardId: number, userId: number): Promise<Board | null> {
    const board = await prisma.board.findUnique({
      where: {
        id: boardId,
        userId,
      },
      include: {
        lists: {
          include: {
            cards: {
              orderBy: {
                order: "asc",
              },
            },
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });
    return board;
  }

  async updateBoard(
    boardId: number,
    userId: number,
    title: string,
  ): Promise<Board | null> {
    const board = await prisma.board.update({
      where: {
        id: boardId,
        userId,
      },
      data: {
        title,
      },
    });
    return board;
  }

  async deleteBoard(boardId: number, userId: number): Promise<Board | null> {
    const board = await prisma.board.delete({
      where: {
        id: boardId,
        userId,
      },
    });
    return board;
  }
}

export default new BoardService();
