import type { Prisma, User as DbUser } from '../../../generated/prisma';
import type { User } from '../../../core/entities/user';

export const userSelect = {
    id: true, name: true, email: true, nim: true,
    isActive: true, createdAt: true, updatedAt: true,
} satisfies Prisma.UserSelect;

export const userAuthSelect = {
    ...userSelect,
    password: true,
} satisfies Prisma.UserSelect;

export function toDomain(row: Pick<DbUser, keyof typeof userSelect>): User {
    return {
        id: row.id,
        name: row.name,
        email: row.email.toLowerCase(),
        nim: row.nim ?? null,
        isActive: row.isActive,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}
