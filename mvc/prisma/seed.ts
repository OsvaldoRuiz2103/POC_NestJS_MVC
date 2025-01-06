import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Create three dummy users with proper data
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      name: 'User One',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      name: 'User Two',
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'user3@example.com' },
    update: {},
    create: {
      email: 'user3@example.com',
      name: 'User Three',
    },
  });

  console.log('Seeded users:', { user1, user2, user3 });
}

// Execute the main function
main()
  .catch((e) => {
    console.error('Error seeding the database:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Close Prisma Client at the end
    await prisma.$disconnect();
  });
