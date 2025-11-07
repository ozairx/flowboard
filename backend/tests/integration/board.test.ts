
import request from 'supertest';
import { app, server } from '../../src/server';
import prisma from '../../src/database/client';

describe('Board Endpoints', () => {
  let token: string;

  beforeAll(async () => {
    // Clean up previous test data
    await prisma.user.deleteMany({ where: { email: 'board-user@example.com' } });

    // Create and log in a user
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'board-user@example.com',
        password: 'password123',
        name: 'Board User',
      });
    token = res.body.token;
  });

  afterAll(async () => {
    // Clean up all created data
    await prisma.user.deleteMany({ where: { email: 'board-user@example.com' } });
    await prisma.$disconnect();
    server.close();
  });

  it('should not allow access without a token', async () => {
    const res = await request(app).get('/boards');
    expect(res.statusCode).toEqual(401);
  });

  let board: any;

  beforeEach(async () => {
    // Create a board before each test
    const res = await request(app)
      .post('/boards')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Board' });
    board = res.body;
  });

  afterEach(async () => {
    // Clean up the board after each test
    if (board) {
      await prisma.board.deleteMany({ where: { id: board.id } });
    }
  });

  it('should get all boards for the user', async () => {
    const res = await request(app)
      .get('/boards')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a specific board by id', async () => {
    const res = await request(app)
      .get(`/boards/${board.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', board.id);
  });

  it('should update a board', async () => {
    const res = await request(app)
      .patch(`/boards/${board.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Board Title' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Board Title');
  });

  it('should delete a board', async () => {
    const res = await request(app)
      .delete(`/boards/${board.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);

    // Verify the board is deleted
    const foundBoard = await prisma.board.findUnique({ where: { id: board.id } });
    expect(foundBoard).toBeNull();
    board = null; // prevent afterEach from trying to delete it again
  });
});
