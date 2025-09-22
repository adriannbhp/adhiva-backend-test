import type { User } from '../../../core/entities/user';
import type { Prisma, User as DbUser } from '@prisma/client';

export const userSelect = {
    id: true,
    name: true,
    email: true,
    isActive: true,
    role: true,
    createdAt: true,
    updatedAt: true,
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
        isActive: row.isActive,
        role: row.role as "USER" | "ADMIN",
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}
