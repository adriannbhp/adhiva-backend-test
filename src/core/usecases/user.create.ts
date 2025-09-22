import type { CreateUserInput, UserOutput } from '../dto';
import type { UserRepo } from '../ports/repos';
import type { PasswordHasher } from '../ports/services';
import { ConflictError } from '../errors';

export class UserCreate {
    constructor(private users: UserRepo, private hasher: PasswordHasher) {}

    async execute(input: CreateUserInput): Promise<UserOutput> {
        const password = await this.hasher.hash(input.password);
        try {
            return await this.users.create({
                name: input.name,
                email: input.email,
                password,
            });
        } catch (e: any) {
            if (e?.code === 'P2002') {
                throw new ConflictError('Email already in use');
            }
            throw e;
        }
    }
}