import type { User } from '../../entities/user';

export type UserWithSecret = User & { password: string };

export interface UserRepo {
    findByEmail(email: string): Promise<User | null>;
    findAuthByEmail(email: string): Promise<UserWithSecret | null>;
}
