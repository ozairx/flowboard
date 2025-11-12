import request from 'supertest';
import { app, server } from '../../src/server';
import prisma from '../../src/database/client';
import { User, Board } from '@prisma/client';

describe('List Endpoints', () => {
  let token: string;
  let user: User;
  let board: Board;

  beforeAll(async () => {
    // Clean up previous test data
    await prisma.card.deleteMany({ where: { list: { board: { user: { email: 'list-user@example.com' } } } } });
    await prisma.list.deleteMany({ where: { board: { user: { email: 'list-user@example.com' } } } });
    await prisma.board.deleteMany({ where: { user: { email: 'list-user@example.com' } } });
    await prisma.user.deleteMany({ where: { email: 'list-user@example.com' } });

    // Create a user
    const userRes = await request(app)
      .post('/auth/register')
      .send({
        email: 'list-user@example.com',
        password: 'password123',
        name: 'List User',
      });
    token = userRes.body.token;
    user = userRes.body.user;

    // Create a board
    board = await prisma.board.create({
      data: {
        title: 'Board for Lists',
        userId: user.id,
      },
    });
  });

  afterAll(async () => {
    // Clean up all created data
    await prisma.card.deleteMany({ where: { list: { boardId: board.id } } });
    await prisma.list.deleteMany({ where: { boardId: board.id } });
    await prisma.board.deleteMany({ where: { id: board.id } });
    if (user) {
      await prisma.user.deleteMany({ where: { id: user.id } });
    }
    await prisma.$disconnect();
    server.close();
  });

  it('should create a new list in a board', async () => {
    const res = await request(app)
      .post(`/boards/${board.id}/lists`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'My First List', order: 0 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('My First List');
    expect(res.body.boardId).toBe(board.id);

    // Clean up the list
    await prisma.list.delete({ where: { id: res.body.id } });
  });

  let list: any;

  beforeEach(async () => {
    const res = await request(app)
      .post(`/boards/${board.id}/lists`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test List', order: 0 });
    list = res.body;
  });

  afterEach(async () => {
    if (list) {
      await prisma.list.deleteMany({ where: { id: list.id } });
    }
  });

  it('should update a list', async () => {
    const res = await request(app)
      .patch(`/boards/${board.id}/lists/${list.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated List Title', order: 1 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated List Title');
    expect(res.body).toHaveProperty('order', 1);
  });

  it('should delete a list', async () => {
    const res = await request(app)
      .delete(`/boards/${board.id}/lists/${list.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);

    const foundList = await prisma.list.findUnique({ where: { id: list.id } });
    expect(foundList).toBeNull();
    list = null;
  });
});