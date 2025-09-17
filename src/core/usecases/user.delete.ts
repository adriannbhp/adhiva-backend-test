import type { UserRepo } from '../ports/repos';
import { NotFoundError } from '../errors';

export class UserDelete {
    constructor(private users: UserRepo) {}

    async execute(id: number): Promise<void> {
        const cur = await this.users.findById(id);
        if (!cur) throw new NotFoundError('User not found');
        await this.users.softDelete(id);
    }

    async executePermanent(id: number): Promise<void> {
        const cur = await this.users.findById(id);
        if (!cur) throw new NotFoundError('User not found');
        await this.users.delete(id);
    }
}