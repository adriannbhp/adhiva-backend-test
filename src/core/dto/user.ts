import type { User } from '../entities/user';

export type CreateUserInput = {
    name: string;
    email: string;
    password: string;
    nim?: string | null;
};

export type UpdateUserInput = {
    id: number;
    name?: string;
    email?: string;
    password?: string;
    nim?: string | null;
    isActive?: boolean;
};

export type FindUsersInput = {
    q?: string;
    page?: number;
    limit?: number;
};

export type PaginatedUsersOutput = {
    data: User[];
    total: number;
    page: number;
    limit: number;
};

export type UserOutput = User;
