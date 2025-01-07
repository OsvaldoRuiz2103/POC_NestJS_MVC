import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const org1 = await prisma.organization.upsert({
    where: { id: 1 }, 
    update: {},
    create: {
      name: 'Organization One',
      description: 'This is the first organization.',
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      name: 'User One',
      password: 'password123',
      organizationId: org1.id,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      name: 'User Two',
      password: 'password123',
      organizationId: org1.id,
    },
  });

  const post1 = await prisma.post.create({
    data: {
      content: 'This is the first post by User One.',
      authorId: user1.id,
    },
  });

  const comment1 = await prisma.comment.create({
    data: {
      content: 'Nice post!',
      authorId: user2.id,
      postId: post1.id,
    },
  });
}

main()
  .catch((e) => {
    console.error('Error seeding the database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
