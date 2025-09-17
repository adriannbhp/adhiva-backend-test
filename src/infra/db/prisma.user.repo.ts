import { prisma } from './prisma.client';
import { toDomain, userAuthSelect, userSelect } from './mappers';
import type { UserRepo, UserWithSecret } from '../../core/ports/repos';
import type { User } from '../../core/entities/user';

export class PrismaUserRepo implements UserRepo {
    async findByEmail(email: string): Promise<User | null> {
        const row = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            select: userSelect,
        });
        return row ? toDomain(row as any) : null;
    }

    async findAuthByEmail(email: string): Promise<UserWithSecret | null> {
        const row = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            select: userAuthSelect,
        });
        if (!row) return null;
        const pub = toDomain(row as any);
        return { ...pub, password: (row as any).password };
    }

    async findById(id: number): Promise<User | null> {
        const row = await prisma.user.findUnique({
            where: { id },
            select: userSelect,
        });
        return row ? toDomain(row as any) : null;
    }

    async findMany(params: { q?: string; skip: number; take: number })
        : Promise<{ data: User[]; total: number }> {
        const { q, skip, take } = params;

        const where = q
            ? {
                OR: [
                    { name:  { contains: q, mode: 'insensitive' as const } },
                    { email: { contains: q, mode: 'insensitive' as const } },
                    { nim:   { contains: q, mode: 'insensitive' as const } },
                ],
            }
            : {};

        const [rows, total] = await Promise.all([
            prisma.user.findMany({ where, select: userSelect, skip, take, orderBy: { createdAt: 'desc' } }),
            prisma.user.count({ where }),
        ]);

        return { data: rows.map((r: any) => toDomain(r)), total }; // <- tambahkan anotasi (r: any) biar TS7006 hilang
    }

    async create(data: { name: string; email: string; password: string; nim?: string | null }): Promise<User> {
        const row = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email.toLowerCase(),
                password: data.password,
                nim: data.nim ?? null,
            },
            select: userSelect,
        });
        return toDomain(row as any);
    }

    async update(
        id: number,
        data: { name?: string; email?: string; password?: string; nim?: string | null; isActive?: boolean },
    ): Promise<User> {
        const row = await prisma.user.update({
            where: { id },
            data: {
                ...(data.name != null ? { name: data.name } : {}),
                ...(data.email != null ? { email: data.email.toLowerCase() } : {}),
                ...(data.password != null ? { password: data.password } : {}),
                ...(data.nim !== undefined ? { nim: data.nim } : {}),
                ...(data.isActive != null ? { isActive: data.isActive } : {}),
            },
            select: userSelect,
        });
        return toDomain(row as any);
    }

    async softDelete(id: number): Promise<void> {
        await prisma.user.update({
            where: { id },
            data: { isActive: false },
            select: { id: true },
        });
    }
}
