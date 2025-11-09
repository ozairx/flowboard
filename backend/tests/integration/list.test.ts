
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
    await prisma.list.deleteMany({ where: { board: { user: { email: 'list-user@example.com' } } } });
    await prisma.board.deleteMany({ where: { user: { email: 'list-user@example.com' } } });
    await prisma.user.deleteMany({ where: { email: 'list-user@example.com' } });

    // Create a user and a board
    const userRes = await request(app)
      .post('/auth/register')
      .send({
        email: 'list-user@example.com',
        password: 'password123',
        name: 'List User',
      });
    token = userRes.body.token;
    user = userRes.body.user;

    // Create a board with ID 1 for testing
    await prisma.board.create({
      data: {
        id: 1,
        title: 'Board for Lists',
        userId: user.id,
      },
    });
            board = {
      id: 1,
      title: 'Board for Lists',
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  afterAll(async () => {
    // Clean up all created data
    await prisma.list.deleteMany({ where: { boardId: 1 } });
    await prisma.board.deleteMany({ where: { id: 1 } });
    if (user) {
      await prisma.user.deleteMany({ where: { id: user.id } });
    }
    await prisma.$disconnect();
    server.close();
  });

  it('should create a new list in a board', async () => {
    const res = await request(app)
      .post('/boards/1/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'My First List', order: 0 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('My First List');
    expect(res.body.boardId).toBe(1);

    // Clean up the list
    await prisma.list.delete({ where: { id: res.body.id } });
  });

  let list: any;

  beforeEach(async () => {
    const res = await request(app)
      .post('/boards/1/lists')
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
      .patch('/boards/1/lists/' + list.id)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated List Title', order: 1 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated List Title');
    expect(res.body).toHaveProperty('order', 1);
  });

  it('should delete a list', async () => {
    const res = await request(app)
      .delete('/boards/1/lists/' + list.id)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);

    const foundList = await prisma.list.findUnique({ where: { id: list.id } });
    expect(foundList).toBeNull();
    list = null;
  });

  // it('should reorder lists', async () => {
  //   // Create another list to reorder
  //   const anotherListRes = await request(app)
  //     .post('/boards/1/lists')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({ title: 'Another List', order: 1 });
  //   const anotherList = anotherListRes.body;

  //   const listUpdates = [
  //     { id: list.id, order: 1 },
  //     { id: anotherList.id, order: 0 },
  //   ];

  //   const res = await request(app)
  //     .patch('/boards/1/lists/reorder')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({ listUpdates });

  //   expect(res.statusCode).toEqual(200);

  //   const updatedList = await prisma.list.findUnique({ where: { id: list.id } });
  //   expect(updatedList?.order).toBe(1);

  //   const updatedAnotherList = await prisma.list.findUnique({ where: { id: anotherList.id } });
  //   expect(updatedAnotherList?.order).toBe(0);

  //   // Cleanup
  //   await prisma.list.delete({ where: { id: anotherList.id } });
  // });
});
