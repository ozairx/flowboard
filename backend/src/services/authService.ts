import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../database/client';
import { User } from '@prisma/client';

class AuthService {
  async register(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_default_secret', {
      expiresIn: '1d',
    });

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async login(data: Pick<User, 'email' | 'password'>): Promise<{ user: Omit<User, 'password'>; token: string } | null> {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      return null; // User not found
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      return null; // Invalid password
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_default_secret', {
      expiresIn: '1d', // Token expires in 1 day
    });

    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }
}

export default new AuthService();
