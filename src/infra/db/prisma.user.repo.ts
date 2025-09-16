import { prisma } from './prisma.client';
import type { UserRepo } from '../../core/ports/repos/user.repo';
import type { User } from '../../core/entities/user';
import { userSelect, userAuthSelect, toDomain } from './mappers/user.mapper';

export class PrismaUserRepo implements UserRepo {
    async findByEmail(email: string): Promise<User | null> {
        const row = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            select: userSelect,
        });
        return row ? toDomain(row as any) : null;
    }

    async findAuthByEmail(email: string) {
        const row = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            select: userAuthSelect,
        });
        if (!row) return null;
        const { password, ...pub } = row as any;
        return { ...toDomain(pub), password };
    }
}
