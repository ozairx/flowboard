import { prisma } from '../database/client';

export const getUserById = async (id: any) => {
  console.log('fetching user with id:', id);
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    console.log('found user:', user);
    return user;
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw error;
  }
};
