
import request from 'supertest';
import { app, server } from '../../src/server';
import prisma from '../../src/database/client';

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    // Clean up the created user before the test
    await prisma.user.deleteMany({
      where: {
        email: 'test@example.com',
      },
    });
  });

  afterAll(async () => {
    // Clean up the created user
    await prisma.user.deleteMany({
      where: {
        email: 'test@example.com',
      },
    });
    await prisma.$disconnect();
    server.close();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.email).toBe('test@example.com');
  });
});
