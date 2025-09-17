import type { CreateUserInput, UserOutput } from '../dto/user';
import type { UserRepo } from '../ports/repos';
import type { PasswordHasher } from '../ports/services';
import { AppError } from '../errors';

export class UserCreate {
    constructor(private users: UserRepo, private hasher: PasswordHasher) {}

    async execute(input: CreateUserInput): Promise<UserOutput> {
        const password = await this.hasher.hash(input.password);
        try {
            return await this.users.create({
                name: input.name,
                email: input.email,
                password,
                nim: input.nim ?? null,
            });
        } catch (e: any) {
            if (e?.code === 'P2002') throw new AppError('EMAIL_TAKEN', 409, 'Email already in use');
            throw e;
        }
    }
}