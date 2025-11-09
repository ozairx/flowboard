import cardService from '../../src/services/cardService';
import prismaMock from '../mocks/prisma';

describe('CardService', () => {
  const listId = 1;

  describe('createCard', () => {
    it('should create a new card', async () => {
      const cardData = { title: 'New Card', listId, order: 0, description: 'A new card' };
      const card = { id: 1, ...cardData, createdAt: new Date(), updatedAt: new Date() };

      prismaMock.card.create.mockResolvedValue(card);

      const result = await cardService.createCard(cardData.title, cardData.listId, cardData.order, cardData.description);

      expect(prismaMock.card.create).toHaveBeenCalledWith({ data: cardData });
      expect(result).toEqual(card);
    });
  });

  describe('updateCard', () => {
    it('should update a card', async () => {
      const cardId = 1;
      const updatedData = { title: 'Updated Card', description: 'Updated description', order: 1 };
      const card = { id: cardId, listId, ...updatedData, createdAt: new Date(), updatedAt: new Date() };

      prismaMock.card.update.mockResolvedValue(card);

      const result = await cardService.updateCard(cardId, listId, updatedData.title, updatedData.description, updatedData.order);

      expect(prismaMock.card.update).toHaveBeenCalledWith({ where: { id: cardId, listId }, data: updatedData });
      expect(result).toEqual(card);
    });
  });

  describe('deleteCard', () => {
    it('should delete a card', async () => {
      const cardId = 1;
      const card = { id: cardId, title: 'Test Card', listId, order: 0, description: null, createdAt: new Date(), updatedAt: new Date() };

      prismaMock.card.delete.mockResolvedValue(card);

      const result = await cardService.deleteCard(cardId, listId);

      expect(prismaMock.card.delete).toHaveBeenCalledWith({ where: { id: cardId, listId } });
      expect(result).toEqual(card);
    });
  });

  describe('reorderCards', () => {
    it('should reorder cards in a transaction', async () => {
      const cardUpdates = [{ id: 1, order: 1, listId: 1 }, { id: 2, order: 0, listId: 1 }];

      prismaMock.$transaction.mockResolvedValue([]);

      await cardService.reorderCards(listId, cardUpdates);

      expect(prismaMock.$transaction).toHaveBeenCalled();
    });
  });
});
