import { PrismaClient } from '../../generated/prisma';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({

    });

if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;

process.on('beforeExit', async () => {
    await prisma.$disconnect();
});