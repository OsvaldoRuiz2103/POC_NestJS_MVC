"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
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
main()
    .catch((e) => {
    console.error('Error seeding the database:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map