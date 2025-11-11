import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.create({
    data: {
      email: 'seed-user@example.com',
      name: 'Seed User',
      password: hashedPassword,
    },
  });

  const board = await prisma.board.create({
    data: {
      title: 'Seed Board',
      userId: user.id,
      lists: {
        create: [
          {
            title: 'To Do',
            order: 0,
            cards: {
              create: [
                { title: 'Task 1', order: 0 },
                { title: 'Task 2', order: 1 },
              ],
            },
          },
          {
            title: 'In Progress',
            order: 1,
            cards: {
              create: [{ title: 'Task 3', order: 0 }],
            },
          },
          {
            title: 'Done',
            order: 2,
            cards: {
              create: [{ title: 'Task 4', order: 0 }],
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
