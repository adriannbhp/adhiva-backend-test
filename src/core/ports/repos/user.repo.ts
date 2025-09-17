import type { User } from '../../entities/user';

export type UserWithSecret = User & { password: string };

export interface UserRepo {
    // auth
    findByEmail(email: string): Promise<User | null>;
    findAuthByEmail(email: string): Promise<UserWithSecret | null>;

    // crud
    findById(id: number): Promise<User | null>;
    findMany(params: { q?: string; skip: number; take: number }): Promise<{ data: User[]; total: number }>;
    create(data: { name: string; email: string; password: string; nim?: string | null }): Promise<User>;
    update(
        id: number,
        data: { name?: string; email?: string; password?: string; nim?: string | null; isActive?: boolean }
    ): Promise<User>;
    softDelete(id: number): Promise<void>;
}
