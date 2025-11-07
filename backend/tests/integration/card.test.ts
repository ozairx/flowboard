
import request from 'supertest';
import { app, server } from '../../src/server';
import prisma from '../../src/database/client';
import { User, Board, List } from '@prisma/client';

describe('Card Endpoints', () => {
  let token: string;
  let user: User;
  let board: Board;
  let list: List;

  beforeAll(async () => {
    // Clean up previous test data
    await prisma.card.deleteMany({ where: { list: { board: { user: { email: 'card-user@example.com' } } } } });
    await prisma.list.deleteMany({ where: { board: { user: { email: 'card-user@example.com' } } } });
    await prisma.board.deleteMany({ where: { user: { email: 'card-user@example.com' } } });
    await prisma.user.deleteMany({ where: { email: 'card-user@example.com' } });

    // Create a user
    const userRes = await request(app)
      .post('/auth/register')
      .send({
        email: 'card-user@example.com',
        password: 'password123',
        name: 'Card User',
      });
    token = userRes.body.token;
    user = userRes.body.user;

    // Create a board
    const boardRes = await request(app)
      .post('/boards')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Board for Cards' });
    board = boardRes.body;

    // Create a list
    const listRes = await request(app)
      .post(`/boards/${board.id}/lists`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'List for Cards', order: 0 });
    list = listRes.body;
  });

  afterAll(async () => {
    // Clean up all created data
    await prisma.card.deleteMany({ where: { listId: list.id } });
    await prisma.list.deleteMany({ where: { boardId: board.id } });
    await prisma.board.deleteMany({ where: { userId: user.id } });
    await prisma.user.deleteMany({ where: { id: user.id } });
    await prisma.$disconnect();
    server.close();
  });

  let card: any;

  beforeEach(async () => {
    const res = await request(app)
      .post(`/boards/${board.id}/lists/${list.id}/cards`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Card', description: 'Card description', order: 0 });
    card = res.body;
  });

  afterEach(async () => {
    if (card) {
      await prisma.card.deleteMany({ where: { id: card.id } });
    }
  });

  it('should update a card', async () => {
    const res = await request(app)
      .patch(`/boards/${board.id}/lists/${list.id}/cards/${card.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Card Title', description: 'Updated description', order: 1 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Card Title');
    expect(res.body).toHaveProperty('description', 'Updated description');
    expect(res.body).toHaveProperty('order', 1);
  });

  it('should delete a card', async () => {
    const res = await request(app)
      .delete(`/boards/${board.id}/lists/${list.id}/cards/${card.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);

    const foundCard = await prisma.card.findUnique({ where: { id: card.id } });
    expect(foundCard).toBeNull();
    card = null;
  });

  // it('should reorder cards', async () => {
  //   // Create another card to reorder
  //   const anotherCardRes = await request(app)
  //     .post(`/boards/${board.id}/lists/${list.id}/cards`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({ title: 'Another Card', description: 'Another description', order: 1 });
  //   const anotherCard = anotherCardRes.body;

  //   const cardUpdates = [
  //     { id: card.id, order: 1 },
  //     { id: anotherCard.id, order: 0 },
  //   ];

  //   const res = await request(app)
  //     .patch(`/boards/${board.id}/lists/${list.id}/cards/reorder`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({ cardUpdates });

  //   expect(res.statusCode).toEqual(200);

  //   const updatedCard = await prisma.card.findUnique({ where: { id: card.id } });
  //   expect(updatedCard?.order).toBe(1);

  //   const updatedAnotherCard = await prisma.card.findUnique({ where: { id: anotherCard.id } });
  //   expect(updatedAnotherCard?.order).toBe(0);

  //   // Cleanup
  //   await prisma.card.delete({ where: { id: anotherCard.id } });
  // });
});
