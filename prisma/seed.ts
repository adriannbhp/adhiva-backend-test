import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const hash = await bcrypt.hash("Admin123!", 12)
    await prisma.user.upsert({
        where: { email: "admin@gmail.com" },
        update: {},
        create: { name: "Admin", email: "admin@gmail.com", passwordHash: hash, role: "Admin", isActive: true },
    });
}
main().finally(() => prisma.$disconnect());