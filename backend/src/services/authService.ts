import bcrypt from 'bcryptjs';
import prisma from '../database/client';
import { User } from '@prisma/client';

class AuthService {
  async register(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export default new AuthService();
