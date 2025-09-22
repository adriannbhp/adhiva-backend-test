import { PrismaClient } from '../src/generated/prisma';

import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hash = await bcrypt.hash('Admin123!', 12);

    await prisma.user.upsert({
        where: { email: 'test@gmail.com' },
        update: {},
        create: {
            name: 'test',
            email: 'test@gmail.com',
            password: hash,
            isActive: true,
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
