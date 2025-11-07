
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

    // Create a user for login tests
    await request(app)
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
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

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'password123',
          name: 'New User',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user.email).toBe('newuser@example.com');

      // Clean up the new user
      await prisma.user.deleteMany({
        where: {
          email: 'newuser@example.com',
        },
      });
    });
  });

  describe('POST /auth/login', () => {
    it('should login an existing user', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user.email).toBe('test@example.com');
    });

    it('should not login with invalid credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body).not.toHaveProperty('token');
    });
  });
});
