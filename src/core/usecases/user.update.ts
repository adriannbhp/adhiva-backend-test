import type { UpdateUserInput, UserOutput } from '../dto/user';
import type { UserRepo } from '../ports/repos';
import type { PasswordHasher } from '../ports/services';
import { NotFoundError } from '../errors';

export class UserUpdate {
    constructor(private users: UserRepo, private hasher: PasswordHasher) {}

    async execute(input: UpdateUserInput): Promise<UserOutput> {
        const cur = await this.users.findById(input.id);
        if (!cur) throw new NotFoundError('User does not exist');

        const password =
            input.password ? await this.hasher.hash(input.password) : undefined;

        return this.users.update(input.id, {
            ...(input.name !== undefined ? { name: input.name } : {}),
            ...(input.email !== undefined ? { email: input.email } : {}),
            ...(password !== undefined ? { password } : {}),
            ...(input.nim !== undefined ? { nim: input.nim } : {}), // null valid
            ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
        });
    }
}