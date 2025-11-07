import authService from '../../src/services/authService';
import prismaMock from '../mocks/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

describe('AuthService', () => {
  describe('register', () => {
    it('should hash the password and create a new user', async () => {
      const userData = { email: 'test@example.com', password: 'password123', name: 'Test User' };
      const hashedPassword = 'hashedpassword';

      (bcrypt.hash as jest.Mock) = jest.fn().mockResolvedValue(hashedPassword);

      const expectedUser = {
        id: 1,
        ...userData,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.user.create.mockResolvedValue(expectedUser);
      (jwt.sign as jest.Mock) = jest.fn().mockReturnValue('mocked_token');

      const result = await authService.register(userData);

      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
      expect(jwt.sign).toHaveBeenCalledWith({ id: expectedUser.id }, process.env.JWT_SECRET || 'your_default_secret', { expiresIn: '1d' });
      const { password, ...userWithoutPassword } = expectedUser;
      expect(result).toEqual({ user: userWithoutPassword, token: 'mocked_token' });
    });
  });

  describe('login', () => {
    it('should return user and token for valid credentials', async () => {
      const loginData = { email: 'test@example.com', password: 'password123' };
      const user = {
        id: 1,
        ...loginData,
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.user.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(true);
      (jwt.sign as jest.Mock) = jest.fn().mockReturnValue('testtoken');

      const result = await authService.login(loginData);

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { email: loginData.email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginData.password, user.password);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result?.token).toBe('testtoken');
    });

    it('should return null for invalid credentials', async () => {
      const loginData = { email: 'test@example.com', password: 'wrongpassword' };

      prismaMock.user.findUnique.mockResolvedValue(null);

      const result = await authService.login(loginData);
      expect(result).toBeNull();
    });
  });
});
