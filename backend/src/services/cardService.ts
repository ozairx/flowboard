import prisma from "../database/client";
import { Card } from "@prisma/client";

class CardService {
  async createCard(
    title: string,
    listId: number,
    order: number,
    description?: string,
  ): Promise<Card> {
    const card = await prisma.card.create({
      data: {
        title,
        listId,
        order,
        description: description || null,
      },
    });
    return card;
  }

  async updateCard(
    cardId: number,
    listId: number,
    title?: string,
    description?: string,
    order?: number,
  ): Promise<Card | null> {
    const data: {
      title?: string;
      description?: string | null;
      order?: number;
    } = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description || null;
    if (order !== undefined) data.order = order;

    const card = await prisma.card.update({
      where: {
        id: cardId,
        listId,
      },
      data,
    });
    return card;
  }

  async deleteCard(cardId: number, listId: number): Promise<Card | null> {
    const card = await prisma.card.delete({
      where: {
        id: cardId,
        listId,
      },
    });
    return card;
  }

  async reorderCards(
    listId: number,
    cardUpdates: { id: number; order: number; listId: number }[],
  ): Promise<void> {
    const transaction = cardUpdates.map((card) =>
      prisma.card.update({
        where: { id: card.id },
        data: { order: card.order, listId: card.listId },
      }),
    );
    await prisma.$transaction(transaction);
  }
}

export default new CardService();
